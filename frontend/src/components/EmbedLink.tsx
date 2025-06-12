import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface EmbedLinkProps {
  id: string | undefined;
  setShowEmbedLink: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmbedLink: React.FC<EmbedLinkProps> = ({ id, setShowEmbedLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`
        <div id="review-widget"></div>
        <script 
  src="http://localhost:5000/embed/embed.js" 
  data-project-id="${id}">
</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
        <div className="flex flex-col gap-4 w-[90%] max-w-lg bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8 rounded-2xl shadow-2xl text-white border border-blue-900">
          <button
            className="text-[var(--color-brand-text)]"
            onClick={() => setShowEmbedLink(false)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">
            Embed your Reviews
          </h2>
          <p>Paste the following in your project:</p>
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <span className="text-sm break-all text-gray-800">
              {`<div id="review-widget"></div>`} <br />
              {`<script 
  src="http://localhost:5000/embed/embed.js" 
  data-project-id="${id}">
</script>`}
            </span>
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md ml-2 text-sm transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedLink;
