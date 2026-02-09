import React from 'react';
interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const TextArea = ({ name, ...rest }: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm">Description</span>
      <hr className="w-full border border-slate-200" />
      <textarea
        name={name}
        {...rest}
        className="bg-moonstone h-32 w-full rounded-md border-3 border-dotted border-slate-300 p-2 md:h-60"
      ></textarea>
    </div>
  );
};

export default TextArea;
