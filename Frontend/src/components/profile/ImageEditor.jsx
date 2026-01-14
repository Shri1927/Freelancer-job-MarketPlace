import { useState, useRef, useCallback } from "react"
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RotateCw, RotateCcw, ZoomIn, Upload } from "lucide-react"

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

const ImageEditor = ({ isOpen, onClose, onSave, currentImage }) => {
  const [imgSrc, setImgSrc] = useState(currentImage || "")
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState([1])
  const imgRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = e => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImgSrc(reader.result)
        setRotation(0)
        setZoom([1])
      }
      reader.readAsDataURL(file)
    }
  }

  const onImageLoad = useCallback(e => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }, [])

  const handleRotateLeft = () => {
    setRotation(prev => (prev - 90) % 360)
  }

  const handleRotateRight = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const getCroppedImg = useCallback(async () => {
    if (!imgRef.current || !completedCrop) return null

    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const cropX = completedCrop.x * scaleX
    const cropY = completedCrop.y * scaleY
    const cropWidth = completedCrop.width * scaleX
    const cropHeight = completedCrop.height * scaleY

    // Set canvas size to desired output
    const outputSize = 300
    canvas.width = outputSize
    canvas.height = outputSize

    // Apply rotation
    ctx.translate(outputSize / 2, outputSize / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(zoom[0], zoom[0])
    ctx.translate(-outputSize / 2, -outputSize / 2)

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      outputSize,
      outputSize
    )

    return canvas.toDataURL("image/jpeg", 0.9)
  }, [completedCrop, rotation, zoom])

  const handleSave = async () => {
    if (imgSrc && !completedCrop) {
      // If no crop was made, use the original image
      onSave(imgSrc)
      handleClose()
      return
    }

    const croppedImage = await getCroppedImg()
    if (croppedImage) {
      onSave(croppedImage)
      handleClose()
    }
  }

  const handleClose = () => {
    setImgSrc(currentImage || "")
    setRotation(0)
    setZoom([1])
    setCrop(undefined)
    setCompletedCrop(undefined)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile Photo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Upload Button */}
          <div className="flex justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </Button>
          </div>

          {/* Image Preview & Crop */}
          {imgSrc ? (
            <div className="space-y-4">
              <div className="flex justify-center bg-muted rounded-lg p-4 overflow-hidden">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={c => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Crop preview"
                    onLoad={onImageLoad}
                    style={{
                      maxHeight: "300px",
                      transform: `rotate(${rotation}deg) scale(${zoom[0]})`,
                      transition: "transform 0.2s"
                    }}
                  />
                </ReactCrop>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Rotation */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRotateLeft}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">Rotate</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRotateRight}
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Zoom */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ZoomIn className="w-4 h-4 text-muted-foreground" />
                    <Label>Zoom</Label>
                  </div>
                  <Slider
                    value={zoom}
                    onValueChange={setZoom}
                    min={0.5}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg">
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Click "Upload Photo" to select an image
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!imgSrc}>
              Save Photo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageEditor
