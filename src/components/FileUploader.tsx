import React, { useRef, useState, useEffect } from 'react';
import { uploadToCloudinary } from '../services/cloudinary.services';

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
  id: string;
}

interface FileUploaderProps {
  accept?: string;
  maxSizeMB?: number;
  label: string;
  name: string;
  onUpload?: (url: string) => void;
  onChange?: (urls: string[]) => void;
}

const FileUploader = ({
  accept = '*',
  maxSizeMB = 20,
  label,
  name,
  onUpload,
  onChange,
}: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  const handleFiles = async (selectedFiles: FileList) => {
    setError('');

    for (const file of Array.from(selectedFiles)) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Each file must be under ${maxSizeMB}MB`);
        continue;
      }

      const id = `${Date.now()}-${Math.random()}`;
      const preview = URL.createObjectURL(file);

      const newFile: UploadedFile = {
        file,
        preview,
        progress: 0,
        id,
      };

      setFiles((prev) => [...prev, newFile]);

      try {
        const updateProgress = (progress: number) => {
          setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress } : f)));
        };

        const uploadResult = await uploadToCloudinary(file, updateProgress);
        const url = uploadResult.url;

        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: 100, preview: url } : f)),
        );
        const updatedUrls = [...uploadedUrls, url];
        setUploadedUrls(updatedUrls);

        onUpload?.(url);
        onChange?.(updatedUrls);
      } catch (err) {
        setError('Upload failed');
        setFiles((prev) => prev.filter((f) => f.id !== id));
      }
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="h-full w-full space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm">{label}</label>
        <hr className="border-slate-200" />
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        className={`flex h-52 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition ${
          isDragging ? 'border-secondary bg-blue-50' : 'border-slate-300'
        }`}
      >
        <p className="text-sm text-slate-600">Drag & drop files here</p>
        <p className="text-xs text-slate-400">or click to upload</p>
      </div>

      <input
        ref={inputRef}
        name={name}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
            e.target.value = '';
          }
        }}
      />

      {error && <p className="text-xs">{error}</p>}

      <div className="space-y-3">
        {files.map((item) => (
          <div key={item.id} className="flex w-full items-center gap-3 rounded-md border p-2">
            {item.file.type.startsWith('image/') ? (
              <img src={item.preview} className="h-12 w-12 rounded object-cover" alt="preview" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100">
                <span className="text-xs font-medium">
                  {item.file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                </span>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{item.file.name}</p>
              <div className="mt-1 h-2 rounded bg-slate-200">
                <div className="bg-secondary h-2 rounded" style={{ width: `${item.progress}%` }} />
              </div>
            </div>

            <span className="text-xs">{item.progress}%</span>

            <button onClick={() => removeFile(item.id)} className="text-slate-400">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
