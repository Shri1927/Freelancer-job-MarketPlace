import { useState } from 'react';
import { Bold, Italic, List, Link2, AlignLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DeliveryNotes = ({
  value,
  onChange,
  required = false,
  placeholder = 'Describe your deliverables, what you\'ve completed, and any important notes for the client...',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.querySelector('textarea[data-delivery-notes]');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newValue = 
      value.substring(0, start) + 
      prefix + 
      selectedText + 
      (suffix || prefix) + 
      value.substring(end);
    
    onChange(newValue);
  };

  const formatButtons = [
    { icon: Bold, label: 'Bold', action: () => insertFormatting('**') },
    { icon: Italic, label: 'Italic', action: () => insertFormatting('_') },
    { icon: List, label: 'List', action: () => insertFormatting('\n- ') },
    { icon: Link2, label: 'Link', action: () => insertFormatting('[', '](url)') },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Delivery Notes
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <span className="text-xs text-muted-foreground">
          {value.length} characters
        </span>
      </div>

      <div
        className={cn(
          'rounded-lg border transition-all',
          isFocused ? 'border-primaryblue ring-2 ring-primaryblue/20' : 'border-border'
        )}
      >
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30 rounded-t-lg">
          {formatButtons.map((btn) => (
            <Button
              key={btn.label}
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={btn.action}
              title={btn.label}
            >
              <btn.icon className="h-4 w-4" />
            </Button>
          ))}
          <div className="h-4 w-px bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => onChange('')}
          >
            Clear
          </Button>
        </div>

        {/* Text Area */}
        <Textarea
          data-delivery-notes
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-h-[150px] border-0 rounded-t-none focus-visible:ring-0 resize-y"
        />
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <AlignLeft className="h-3 w-3" />
        Supports basic markdown formatting: **bold**, _italic_, - lists, [links](url)
      </p>
    </div>
  );
};

export default DeliveryNotes;