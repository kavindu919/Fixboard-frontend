import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

interface TagInputProps {
  placeholder?: string;
  label: string;
  value?: string[];
  initialTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  disabled: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  disabled,
  value = [],
  onTagsChange,
  ...rest
}) => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(value);
  useEffect(() => {
    setTags(value);
  }, [value]);
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      onTagsChange?.(newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm">{label}</label>
      <div className="flex w-full gap-2">
        <input
          type="text"
          value={tagInput}
          disabled={disabled}
          {...rest}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
          className="bg-moonstone h-10 w-full rounded-md border border-slate-300 px-3 text-sm"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-secondary rounded-md px-4 py-2 text-sm text-white"
        >
          Add
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="cursor-pointer text-slate-500"
            >
              <IoIosClose className="text-base" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagInput;
