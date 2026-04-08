'use client';
import React, { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
}

export const ImageUploader = ({
  label,
  value,
  onChange,
  folder = "general",
  placeholder = "Upload an image or enter URL",
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [urlMode, setUrlMode] = useState(!value || value.startsWith("http") || value.startsWith("/"));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPEG, PNG, WebP, or GIF.");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("case-study-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("case-study-images")
        .getPublicUrl(fileName);

      onChange(publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setUrlMode(!urlMode)}
          className="text-xs text-muted-foreground"
        >
          {urlMode ? "Upload file" : "Enter URL"}
        </Button>
      </div>

      {urlMode ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {value ? (
            <div className="relative group">
              <img
                src={value}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border border-border"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full h-40 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-accent/50 hover:bg-accent/5 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                  <span className="text-sm text-muted-foreground">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload</span>
                  <span className="text-xs text-muted-foreground">JPEG, PNG, WebP, GIF (max 10MB)</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {value && !urlMode && (
        <p className="text-xs text-muted-foreground truncate">{value}</p>
      )}
    </div>
  );
};

interface MultiImageUploaderProps {
  label: string;
  images: { id: string; url: string; label?: string }[];
  onChange: (images: { id: string; url: string; label?: string }[]) => void;
  folder?: string;
}

export const MultiImageUploader = ({
  label,
  images,
  onChange,
  folder = "gallery",
}: MultiImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
          throw new Error(`Invalid file type: ${file.name}`);
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File too large: ${file.name}`);
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("case-study-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("case-study-images")
          .getPublicUrl(fileName);

        return {
          id: crypto.randomUUID(),
          url: publicUrl,
          label: file.name.replace(/\.[^/.]+$/, ""),
        };
      });

      const newImages = await Promise.all(uploadPromises);
      onChange([...images, ...newImages]);
      toast.success(`${newImages.length} image(s) uploaded`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload images");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (id: string) => {
    onChange(images.filter((img) => img.id !== id));
  };

  const handleLabelChange = (id: string, newLabel: string) => {
    onChange(images.map((img) => (img.id === id ? { ...img, label: newLabel } : img)));
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={image.label || "Gallery image"}
              className="w-full h-24 object-cover rounded-lg border border-border"
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={() => handleRemove(image.id)}
            >
              <X className="h-3 w-3" />
            </Button>
            <Input
              value={image.label || ""}
              onChange={(e) => handleLabelChange(image.id, e.target.value)}
              placeholder="Label"
              className="mt-1 h-7 text-xs"
            />
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-accent/50 hover:bg-accent/5 transition-colors disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
          ) : (
            <>
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add images</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};


