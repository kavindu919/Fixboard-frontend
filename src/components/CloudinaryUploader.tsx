import { useEffect, useRef } from 'react';
import { GrStatusGood } from 'react-icons/gr';
import { TbPlayerStop } from 'react-icons/tb';

export interface Attachment {
  name: string;
  url: string;
  uploadedAt: string;
}

interface CloudinaryUploaderProps {
  name: string;
  label: string;
  value: Attachment[];
  onChange: (attachments: Attachment[]) => void;
}

const CloudinaryUploader = ({ name, label, value, onChange }: CloudinaryUploaderProps) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!window.cloudinary) return;

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple: true,
        resourceType: 'auto',
        folder: 'fixboard/attachments',
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp', 'pdf'],
        maxFileSize: 20 * 1024 * 1024,
      },
      (_: any, result: any) => {
        if (result?.event === 'success') {
          const attachment: Attachment = {
            name: result.info.original_filename,
            url: result.info.secure_url,
            uploadedAt: result.info.created_at,
          };

          onChange([...value, attachment]);
        }
      },
    );
  }, [value, onChange]);

  const openWidget = () => {
    widgetRef.current?.open();
  };

  const removeAttachment = (url: string) => {
    onChange(value.filter((item) => item.url !== url));
  };

  return (
    <div className="h-full w-full space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm">{label}</label>
        <hr className="border-slate-200" />
      </div>

      <div
        onClick={openWidget}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          openWidget();
        }}
        className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 transition hover:bg-slate-50"
      >
        <p className="text-sm text-slate-600">Drag & drop files here</p>
        <p className="text-xs text-slate-400">or click to upload</p>
      </div>

      <div className="space-y-3">
        {value.map((item) => (
          <div key={item.url} className="flex w-full items-center gap-3 rounded-md border p-2">
            {item.url.match(/\.(jpg|jpeg|png|webp)$/i) ? (
              <img src={item.url} className="h-12 w-12 rounded object-cover" alt={item.name} />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100">
                <span className="text-xs font-medium">
                  {item.name.split('.').pop()?.toUpperCase() || 'FILE'}
                </span>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{item.name}</p>
              <p className="mt-1 text-[10px] text-slate-400">Upload complete</p>
            </div>

            <span>
              <GrStatusGood />
            </span>

            <button
              type="button"
              onClick={() => removeAttachment(item.url)}
              className="text-slate-400"
            >
              <TbPlayerStop />
            </button>
          </div>
        ))}
      </div>

      <input type="hidden" name={name} value={JSON.stringify(value)} />
    </div>
  );
};

export default CloudinaryUploader;
