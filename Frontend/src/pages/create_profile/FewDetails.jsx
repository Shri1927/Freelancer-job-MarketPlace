import { useState, useRef } from "react"
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { useNavigate } from 'react-router-dom';

// Center the crop when first loading
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

function getCroppedImg(image, crop, scale = 1, rotate = 0) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("No 2d context")
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  // Calculate the actual pixel dimensions of the crop area
  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY
  const cropWidth = crop.width * scaleX
  const cropHeight = crop.height * scaleY

  // Set canvas size to the desired output size (crop size)
  canvas.width = cropWidth
  canvas.height = cropHeight

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Translate to the center of the canvas
  ctx.translate(cropWidth / 2, cropHeight / 2)

  // Apply rotation
  ctx.rotate((rotate * Math.PI) / 180)

  // Apply scale
  ctx.scale(scale, scale)

  // Translate back to draw the image correctly
  ctx.translate(-cropWidth / 2, -cropHeight / 2)

  // Draw the cropped and transformed image
  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  )

  return new Promise(resolve => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          throw new Error("Canvas is empty")
        }
        resolve(blob)
      },
      "image/jpeg",
      0.95
    )
  })
}

export default function FewDetails({ onBack, onNext, onSkip, showIndividualProgress = true }) {
   const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    dateOfBirth: "2005-01-02",
    country: "India",
    streetAddress: "",
    city: "",
    stateProvince: "",
    phone: "",
    aptSuite: "",
    zipCode: ""
  })

  const [profilePhoto, setProfilePhoto] = useState(null)
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  const imgRef = useRef(null)
  const fileInputRef = useRef(null)
  const previewCanvasRef = useRef(null)

  const progress = (10 / 10) * 100; // Step 10 out of 10

  const animateTransition = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (callback && typeof callback === 'function') {
        callback();
      }
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleNext = () => {
    if (onNext && typeof onNext === 'function') {
      animateTransition(onNext);
    }
    navigate('/dashboard'); 
  };

  const handleBack = () => {
    if (onBack && typeof onBack === 'function') {
      animateTransition(onBack);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePhotoButtonClick = () => {
    setShowPhotoModal(true)
  }

  const onImageLoad = e => {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const handleFileSelect = event => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = e => {
        setSelectedPhoto(e.target?.result)
        // Reset editing controls when new image is loaded
        setScale(1)
        setRotate(0)
        setCrop(undefined)
        setCompletedCrop(undefined)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = event => {
    event.preventDefault()
  }

  const handleDrop = event => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = e => {
        setSelectedPhoto(e.target?.result)
        setScale(1)
        setRotate(0)
        setCrop(undefined)
        setCompletedCrop(undefined)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePhoto = async () => {
    if (selectedPhoto && imgRef.current && completedCrop) {
      try {
        const blob = await getCroppedImg(
          imgRef.current,
          completedCrop,
          scale,
          rotate
        )

        const url = URL.createObjectURL(blob)
        setProfilePhoto(url)
        setShowPhotoModal(false)
        setSelectedPhoto(null)
        setCrop(undefined)
        setCompletedCrop(undefined)
        setScale(1)
        setRotate(0)
      } catch (error) {
        console.error("Error saving photo:", error)
        alert("Error saving photo. Please try again.")
      }
    } else if (selectedPhoto) {
      // If no crop applied, use original image but still apply zoom and rotate
      const image = new Image()
      image.src = selectedPhoto

      image.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          setProfilePhoto(selectedPhoto)
          setShowPhotoModal(false)
          setSelectedPhoto(null)
          return
        }

        // Calculate dimensions after transformations
        const rad = (rotate * Math.PI) / 180
        const sin = Math.abs(Math.sin(rad))
        const cos = Math.abs(Math.cos(rad))

        const newWidth = image.width * scale * cos + image.height * scale * sin
        const newHeight = image.width * scale * sin + image.height * scale * cos

        canvas.width = newWidth
        canvas.height = newHeight

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.translate(newWidth / 2, newHeight / 2)
        ctx.rotate(rad)
        ctx.scale(scale, scale)
        ctx.translate(-image.width / 2, -image.height / 2)

        ctx.drawImage(image, 0, 0)

        canvas.toBlob(
          blob => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              setProfilePhoto(url)
              setShowPhotoModal(false)
              setSelectedPhoto(null)
              setScale(1)
              setRotate(0)
            }
          },
          "image/jpeg",
          0.95
        )
      }
    }
  }

  const handleCancelPhoto = () => {
    setSelectedPhoto(null)
    setShowPhotoModal(false)
    setCrop(undefined)
    setCompletedCrop(undefined)
    setScale(1)
    setRotate(0)
  }

  const handleDeletePhoto = () => {
    setProfilePhoto(null)
    setSelectedPhoto(null)
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.1))
  }

  const handleRotateLeft = () => {
    setRotate(prev => prev - 90)
  }

  const handleRotateRight = () => {
    setRotate(prev => prev + 90)
  }

  const handleReset = () => {
    setScale(1)
    setRotate(0)
    if (imgRef.current && aspect) {
      const { width, height } = imgRef.current
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">

      <div className="relative z-4 max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">

          {/* Main Content Container */}
          <div className={`bg-card/80 backdrop-blur-lg rounded-xl md:rounded-2xl border border-border/20 shadow-medium p-4 md:p-6 mb-6 transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
          }`}>
            {/* Question Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-xs md:text-sm font-semibold text-primary">
                  Final Step
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                A few last details, then you can check and publish your profile.
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A professional photo helps you build trust with your clients. To keep
                things safe and simple, they'll pay you through us - which is why we
                need your personal information.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-12 mb-6 md:mb-8">
              {/* Left side - Profile Photo */}
              <div className="flex-shrink-0 flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Profile Photo Circle */}
                  <div className="w-32 h-32 md:w-48 md:h-48 bg-muted rounded-full flex items-center justify-center border-2 border-border overflow-hidden">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <svg
                            className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="text-muted-foreground text-xs md:text-sm">Add your photo</div>
                      </div>
                    )}

                    
                  </div>

                  {/* Upload Photo Button */}
                  <div className="mt-4 md:mt-6">
                    <button
                      onClick={handlePhotoButtonClick}
                      className="block w-full px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground text-center rounded-lg md:rounded-xl font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 shadow-soft cursor-pointer text-sm md:text-base"
                    >
                      Upload photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side - Form Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {/* Date of Birth - Full width */}
                <div className="md:col-span-2 border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    Date of Birth *
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80 text-sm md:text-base">{formData.dateOfBirth}</span>
                    <button className="text-primary font-semibold hover:underline text-sm md:text-base">
                      Edit
                    </button>
                  </div>
                </div>

                {/* Country - Full width */}
                <div className="md:col-span-2 border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    Country *
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80 text-sm md:text-base">{formData.country}</span>
                    <button className="text-primary font-semibold hover:underline text-sm md:text-base">
                      Edit
                    </button>
                  </div>
                </div>

                {/* Street Address - Full width */}
                <div className="md:col-span-2 border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    Street address *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter street address"
                    value={formData.streetAddress}
                    onChange={e =>
                      handleInputChange("streetAddress", e.target.value)
                    }
                    className="w-full px-3 py-2 border-2 border-input rounded-lg focus:outline-none focus:border-primary transition-colors bg-background/50 backdrop-blur-sm text-sm md:text-base"
                  />
                </div>

                {/* City and State in one row */}
                <div className="border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={e => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border-2 border-input rounded-lg focus:outline-none focus:border-primary transition-colors bg-background/50 backdrop-blur-sm text-sm md:text-base"
                  />
                </div>

                <div className="border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    placeholder="Enter state/province"
                    value={formData.stateProvince}
                    onChange={e =>
                      handleInputChange("stateProvince", e.target.value)
                    }
                    className="w-full px-3 py-2 border-2 border-input rounded-lg focus:outline-none focus:border-primary transition-colors bg-background/50 backdrop-blur-sm text-sm md:text-base"
                  />
                </div>

                {/* Phone - Full width */}
                <div className="md:col-span-2 border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter number"
                    value={formData.phone}
                    onChange={e => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border-2 border-input rounded-lg focus:outline-none focus:border-primary transition-colors bg-background/50 backdrop-blur-sm text-sm md:text-base"
                  />
                </div>

                {/* Apt/Suite and ZIP Code in one row */}
                <div className="border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    Apt/Suite
                  </label>
                  <input
                    type="text"
                    placeholder="Apt/Suite (Optional)"
                    value={formData.aptSuite}
                    onChange={e => handleInputChange("aptSuite", e.target.value)}
                    className="w-full px-3 py-2 border-2 border-input rounded-lg focus:outline-none focus:border-primary transition-colors bg-background/50 backdrop-blur-sm text-sm md:text-base"
                  />
                </div>

                <div className="border-b border-border pb-4">
                  <label className="block text-base md:text-lg font-bold text-foreground mb-2">
                    ZIP/Postal code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ZIP/Postal code"
                    value={formData.zipCode}
                    onChange={e => handleInputChange("zipCode", e.target.value)}
                    className="w-full px-3 py-2 border-2 border-input rounded-lg focus:outline-none focus:border-primary transition-colors bg-background/50 backdrop-blur-sm text-sm md:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 md:px-6 md:py-3 text-muted-foreground font-medium rounded-lg md:rounded-xl hover:bg-background hover:text-foreground transition-all duration-300 flex items-center gap-2 border border-border backdrop-blur-sm text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onSkip}
                className="px-4 py-2 md:px-5 md:py-3 text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 text-sm md:text-base"
              >
                Skip for now
              </button>
              <button
                onClick={handleNext}
                className={`px-5 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base ${
                  'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-primary-foreground shadow-medium hover:shadow-large'
                }`}
              >
                Review your profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className={`bg-card backdrop-blur-lg rounded-xl md:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {/* Modal Header */}
            <div className="p-4 md:p-6 border-b border-border">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Your photo
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6">
              {!selectedPhoto ? (
                /* Upload Area */
                <div className="text-center">
                  <div
                    className="border-2 border-dashed border-input rounded-lg p-6 md:p-8 mb-4 md:mb-6 cursor-pointer hover:border-primary transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex justify-center mb-3 md:mb-4">
                      <svg
                        className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-base md:text-lg font-semibold text-foreground mb-2">
                      Upload or drop image here
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      250x250 Min / 5MB Max
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div className="bg-primary/10 rounded-lg p-3 md:p-4 mb-4 md:mb-6 text-left">
                    <h3 className="font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">
                      Show clients the best version of yourself!
                    </h3>
                    <p className="text-xs md:text-sm text-foreground/80">
                      <strong>Must be an actual photo of you.</strong>
                      <br />
                      Logos, clip-art, group photos, and digitally-altered
                      images are not allowed.{" "}
                      <a href="#" className="text-primary hover:underline">
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                /* Photo Editing Area */
                <div className="text-center">
                  <div className="mb-4 md:mb-6">
                    <div className="flex justify-center mb-3 md:mb-4">
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={c => setCompletedCrop(c)}
                        aspect={aspect}
                        circularCrop
                        className="max-h-64 md:max-h-96"
                      >
                        <img
                          ref={imgRef}
                          alt="Crop me"
                          src={selectedPhoto}
                          style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                            maxHeight: "300px",
                            transition: "transform 0.1s ease"
                          }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    </div>

                    {/* Editing Controls */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleZoomOut}
                          className="p-1 md:p-2 border border-input rounded-lg hover:bg-muted transition-colors"
                          title="Zoom Out"
                        >
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <span className="text-xs md:text-sm text-muted-foreground">
                          Zoom: {Math.round(scale * 100)}%
                        </span>
                        <button
                          onClick={handleZoomIn}
                          className="p-1 md:p-2 border border-input rounded-lg hover:bg-muted transition-colors"
                          title="Zoom In"
                        >
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleRotateLeft}
                          className="p-1 md:p-2 border border-input rounded-lg hover:bg-muted transition-colors"
                          title="Rotate Left"
                        >
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </button>
                        <span className="text-xs md:text-sm text-muted-foreground">
                          Rotate: {rotate}°
                        </span>
                        <button
                          onClick={handleRotateRight}
                          className="p-1 md:p-2 border border-input rounded-lg hover:bg-muted transition-colors"
                          title="Rotate Right"
                        >
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={handleReset}
                        className="p-1 md:p-2 border border-input rounded-lg hover:bg-muted transition-colors text-xs md:text-sm"
                      >
                        Reset All
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground">
                      Drag to move • Scroll to zoom • Use controls to adjust
                    </p>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-3 md:p-4 mb-4 md:mb-6 text-left">
                    <h3 className="font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">
                      Show clients the best version of yourself!
                    </h3>
                    <p className="text-xs md:text-sm text-foreground/80">
                      <strong>Must be an actual photo of you.</strong>
                      <br />
                      Logos, clip-art, group photos, and digitally-altered
                      images are not allowed.{" "}
                      <a href="#" className="text-primary hover:underline">
                        Learn more
                      </a>
                    </p>
                  </div>

                  {profilePhoto && (
                    <div className="flex items-center justify-center mb-3 md:mb-4">
                      <input
                        type="checkbox"
                        id="delete-photo"
                        className="mr-2"
                        onChange={handleDeletePhoto}
                      />
                      <label
                        htmlFor="delete-photo"
                        className="text-xs md:text-sm text-foreground/80"
                      >
                        Delete current image
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3">
              <button
                onClick={handleCancelPhoto}
                className="px-4 py-2 border-2 border-input rounded-lg text-muted-foreground font-medium hover:bg-muted transition-colors text-sm md:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              {selectedPhoto ? (
                <div className="flex gap-3 order-1 sm:order-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border-2 border-input rounded-lg text-muted-foreground font-medium hover:bg-muted transition-colors text-sm md:text-base"
                  >
                    Change Photo
                  </button>
                  <button
                    onClick={handleSavePhoto}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-lg font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 text-sm md:text-base"
                  >
                    Save Photo
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-lg font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 text-sm md:text-base order-1 sm:order-2"
                >
                  Attach photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}