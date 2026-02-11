import React, { useRef, useState, useEffect } from 'react';
import { uploadToCloudinary } from '../services/cloudinary.services';
import { GrStatusGood } from 'react-icons/gr';
import { TbPlayerStop } from 'react-icons/tb';

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
  id: string;
}

interface Attachment {
  name: string;
  url: string;
  uploadedAt: string;
}

interface FileUploaderProps {
  accept?: string;
  maxSizeMB?: number;
  label: string;
  name: string;
  onUpload?: (attachment: Attachment) => void;
  onChange?: (attachments: Attachment[]) => void;
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
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview.startsWith('blob:')) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const handleFiles = async (selectedFiles: FileList) => {
    setError('');
    const newAttachments: Attachment[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Each file must be under ${maxSizeMB}MB`);
        continue;
      }

      const fileId = `${Date.now()}-${Math.random()}`;
      const previewUrl = URL.createObjectURL(file);

      const newFile: UploadedFile = {
        file,
        preview: previewUrl,
        progress: 0,
        id: fileId,
      };

      setFiles((previous) => [...previous, newFile]);

      try {
        const updateProgress = (progress: number) => {
          setFiles((previous) =>
            previous.map((item) => (item.id === fileId ? { ...item, progress } : item)),
          );
        };

        const uploadResult = await uploadToCloudinary(file, updateProgress);

        const attachment: Attachment = {
          name: uploadResult.filename,
          url: uploadResult.url,
          uploadedAt: uploadResult.created_at,
        };

        setFiles((previous) =>
          previous.map((item) =>
            item.id === fileId ? { ...item, progress: 100, preview: uploadResult.url } : item,
          ),
        );

        newAttachments.push(attachment);
        onUpload?.(attachment);
      } catch {
        setError('Upload failed');
        setFiles((previous) => previous.filter((item) => item.id !== fileId));
      }
    }

    if (newAttachments.length > 0) {
      const updated = [...attachments, ...newAttachments];
      setAttachments(updated);
      onChange?.(updated);
    }
  };

  const removeFile = (fileId: string) => {
    const targetFile = files.find((item) => item.id === fileId);

    if (targetFile) {
      if (!targetFile.preview.startsWith('blob:')) {
        const updated = attachments.filter((attachment) => attachment.url !== targetFile.preview);
        setAttachments(updated);
        onChange?.(updated);
      }

      if (targetFile.preview.startsWith('blob:')) {
        URL.revokeObjectURL(targetFile.preview);
      }
    }

    setFiles((previous) => previous.filter((item) => item.id !== fileId));
  };

  return (
    <div className="h-full w-full space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm">{label}</label>
        <hr className="border-slate-200" />
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (event.dataTransfer.files) {
            handleFiles(event.dataTransfer.files);
          }
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
        onChange={(event) => {
          if (event.target.files) {
            handleFiles(event.target.files);
            event.target.value = '';
          }
        }}
      />

      {error && <p className="text-xs">{error}</p>}

      <div className="space-y-3">
        {files.map((item) => (
          <div key={item.id} className="flex w-full items-center gap-3 rounded-md border p-2">
            {item.file.type.startsWith('image/') ? (
              <img
                src={item.preview}
                className="h-12 w-12 rounded object-cover"
                alt="File preview"
              />
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
                <div
                  className="bg-secondary h-2 rounded transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              {item.progress === 100 && <p className="mt-1 text-[10px]">Upload complete</p>}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs">{item.progress}%</span>
              {item.progress === 100 && (
                <span className="cursor-pointer text-sm text-green-500">
                  <GrStatusGood />
                </span>
              )}
            </div>

            <button
              onClick={() => removeFile(item.id)}
              className="cursor-pointer text-slate-400 hover:text-red-500"
            >
              <TbPlayerStop />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
