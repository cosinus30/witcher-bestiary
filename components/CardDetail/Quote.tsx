import React from "react";

interface IQoute {
  content: string;
  author: string;
}

const Quote = ({ author, content }: IQoute) => (
  <blockquote className="relative p-4 text-xl italic border-l-4 border-neutral-500">
    <div className="" aria-hidden="true">
      &ldquo;
    </div>
    <p className="mb-4 font-lustria text-base sm:text-lg">{content}</p>
    <cite className="flex items-center">
      <div className="flex flex-col items-start">
        <span className="mb-1 text-sm italic">{author}</span>
      </div>
    </cite>
  </blockquote>
);

export default Quote;
