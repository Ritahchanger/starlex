import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Eye,
  Send,
  Type,
  Palette,
  Mail,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Copy,
  Download,
} from "lucide-react";

import { axiosInstance } from "../../config/axiosInstance";

const NewsletterEditor = () => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  const colors = [
    "#1a1a1a",
    "#374151",
    "#6b7280",
    "#9ca3af",
    "#d1d5db",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#a855f7",
    "#f59e0b",
  ];

  const fontSizes = [
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "48px",
  ];

  const execCommand = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  }, [execCommand]);

  const insertImage = useCallback(() => {
    const url = prompt("Enter image URL:");
    if (url) {
      execCommand("insertImage", url);
    }
  }, [execCommand]);

  const handleColorSelect = useCallback(
    (color) => {
      execCommand("foreColor", color);
      setShowColorPicker(false);
    },
    [execCommand]
  );

  const handleFontSizeSelect = useCallback((size) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = size;

      try {
        range.surroundContents(span);
      } catch (e) {
        span.appendChild(range.extractContents());
        range.insertNode(span);
      }

      selection.removeAllRanges();
    }
    setShowFontSizePicker(false);
    editorRef.current?.focus();
  }, []);

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  }, []);

  const handleSendNewsletters = useCallback(async () => {
    if (!subject.trim() || !content.trim()) {
      setError("Please add both a subject and content to your newsletter.");
      return;
    }

    setSending(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axiosInstance.post("/api/v1/newseller/send", {
        subject,
        message: content,
      });

      if (res.data?.message) {
        setSuccess(res.data.message);
      } else {
        setSuccess("Newsletter sent successfully!");
      }
    } catch (err) {
      console.error("Error sending newsletter:", err);
      setError(
        err?.response?.data?.error ||
          "Failed to send newsletter. Please try again."
      );
    } finally {
      setSending(false);
    }
  }, [content, subject]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(content.replace(/<[^>]*>/g, ""));
    setSuccess("Content copied to clipboard!");
    setTimeout(() => setSuccess(null), 3000);
  }, [content]);

  const exportHTML = useCallback(() => {
    const blob = new Blob(
      [
        `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  ${content}
</body>
</html>
    `,
      ],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject || "newsletter"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [content, subject]);

  const togglePreview = useCallback(() => {
    setIsPreview(!isPreview);
  }, [isPreview]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".color-picker-container")) {
        setShowColorPicker(false);
      }
      if (!event.target.closest(".font-size-picker-container")) {
        setShowFontSizePicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const ToolbarButton = ({ onClick, active, children, title, disabled }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2.5 rounded-sm transition-all duration-200 ${
        active
          ? "bg-blue-500 text-white shadow-lg"
          : disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 shadow-sm hover:shadow-md border border-gray-200"
      }`}
      title={title}
    >
      {children}
    </button>
  );

  const NotificationBar = ({ type, message, onClose }) => (
    <div
      className={`fixed top-4 right-4 p-4 rounded-sm
        
        shadow-lg z-50 flex items-center gap-3 max-w-md ${
          type === "success"
            ? "bg-green-50 border border-green-200 text-green-800"
            : "bg-red-50 border border-red-200 text-red-800"
        }`}
    >
      {type === "success" ? (
        <CheckCircle size={20} />
      ) : (
        <AlertCircle size={20} />
      )}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <X size={16} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {success && (
        <NotificationBar
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}
      {error && (
        <NotificationBar
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <div className="mx-auto w-full">
        {/* Header */}
        <div className="bg-white rounded-sm shadow-least p-8 mb-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-sm">
              <Mail className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Newsletter Editor
              </h1>
              <p className="text-gray-600 mt-1">
                Create stunning newsletters with rich formatting
              </p>
            </div>
          </div>

          {/* Subject Line */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your newsletter subject..."
              className="w-full px-4 py-3 b rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg border border-neutral-300"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-sm shadow-least  mb-6">
          <div className="p-6 ">
            <div className="flex flex-wrap gap-3 mb-4">
              {/* Text Formatting */}
              <div className="flex gap-1 p-1 bg-gray-50 rounded-sm">
                <ToolbarButton onClick={() => execCommand("bold")} title="Bold">
                  <Bold size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => execCommand("italic")}
                  title="Italic"
                >
                  <Italic size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => execCommand("underline")}
                  title="Underline"
                >
                  <Underline size={18} />
                </ToolbarButton>
              </div>

              {/* Font Size */}
              <div className="relative font-size-picker-container">
                <ToolbarButton
                  onClick={() => setShowFontSizePicker(!showFontSizePicker)}
                  title="Font Size"
                  active={showFontSizePicker}
                >
                  <Type size={18} />
                </ToolbarButton>
                {showFontSizePicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white  rounded-sm shadow-least z-20 min-w-24">
                    {fontSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFontSizeSelect(size)}
                        className="block w-full px-4 py-3 text-left hover:bg-blue-50 first:rounded-t-sm last:rounded-b-sm transition-colors"
                        style={{ fontSize: size }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="relative color-picker-container">
                <ToolbarButton
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  title="Text Color"
                  active={showColorPicker}
                >
                  <Palette size={18} />
                </ToolbarButton>
                {showColorPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white  rounded-sm shadow-least z-20 p-3">
                    <div className="grid grid-cols-5 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(color)}
                          className="w-8 h-8 rounded-sm  hover:scale-110  transition-all duration-200"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Alignment */}
              <div className="flex gap-1 p-1 bg-gray-50 rounded-lg">
                <ToolbarButton
                  onClick={() => execCommand("justifyLeft")}
                  title="Align Left"
                >
                  <AlignLeft size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => execCommand("justifyCenter")}
                  title="Align Center"
                >
                  <AlignCenter size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => execCommand("justifyRight")}
                  title="Align Right"
                >
                  <AlignRight size={18} />
                </ToolbarButton>
              </div>

              {/* Lists */}
              <div className="flex gap-1 p-1 bg-gray-50 rounded-sm">
                <ToolbarButton
                  onClick={() => execCommand("insertUnorderedList")}
                  title="Bullet List"
                >
                  <List size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => execCommand("insertOrderedList")}
                  title="Numbered List"
                >
                  <ListOrdered size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => execCommand("formatBlock", "blockquote")}
                  title="Quote"
                >
                  <Quote size={18} />
                </ToolbarButton>
              </div>

              {/* Links & Media */}
              <div className="flex gap-1 p-1 bg-gray-50 rounded-sm">
                <ToolbarButton onClick={insertLink} title="Insert Link">
                  <Link size={18} />
                </ToolbarButton>
                <ToolbarButton onClick={insertImage} title="Insert Image">
                  <Image size={18} />
                </ToolbarButton>
              </div>

              {/* Undo/Redo */}
              <div className="flex gap-1 p-1 bg-gray-50 rounded-sm">
                <ToolbarButton onClick={() => execCommand("undo")} title="Undo">
                  <Undo size={18} />
                </ToolbarButton>
                <ToolbarButton onClick={() => execCommand("redo")} title="Redo">
                  <Redo size={18} />
                </ToolbarButton>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={togglePreview}
                className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold transition-all duration-200 ${
                  isPreview
                    ? "bg-gray-500 text-white hover:bg-gray-600 shadow-lg"
                    : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                <Eye size={18} />
                {isPreview ? "Edit" : "Preview"}
              </button>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-sm font-semibold hover:bg-purple-600 transition-all duration-200 shadow-least hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Copy size={18} />
                Copy
              </button>

              <button
                onClick={exportHTML}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-sm font-semibold hover:bg-indigo-600 transition-all duration-200 shadow-least  transform hover:-translate-y-0.5"
              >
                <Download size={18} />
                Export
              </button>

              <button
                onClick={handleSendNewsletters}
                disabled={sending || !subject.trim() || !content.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold transition-all duration-200 shadow-least ${
                  sending || !subject.trim() || !content.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600  transform hover:-translate-y-0.5"
                }`}
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-sm h-4 w-4 "></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Newsletter
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-sm shadow-least ">
          <div className="p-6">
            {isPreview ? (
              <div className="border-2 border-dashed  rounded-sm p-8 min-h-96 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-center gap-2 mb-6 pb-4">
                  <Eye className="text-blue-500" size={20} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Newsletter Preview
                  </h3>
                  {subject && (
                    <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-sm">
                      Subject: {subject}
                    </span>
                  )}
                </div>
                <div
                  className="prose prose-lg max-w-none"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    lineHeight: "1.7",
                    color: "#374151",
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      content ||
                      '<p class="text-gray-500 italic text-center py-12">Start writing to see your newsletter preview...</p>',
                  }}
                />
              </div>
            ) : (
              <div
                ref={editorRef}
                contentEditable
                onInput={handleContentChange}
                className="border-2 border-neutral-300 rounded-sm p-6 min-h-96 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
                data-placeholder="Start crafting your newsletter... Use the toolbar above to format your content!"
              />
            )}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-white rounded-sm shadow-least border border-gray-100 mt-6 p-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={16} />
                <span className="text-sm font-medium">1,247 subscribers</span>
              </div>
              <div className="text-sm text-gray-500">
                Characters:{" "}
                <span className="font-semibold">
                  {content.replace(/<[^>]*>/g, "").length}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Words:{" "}
                <span className="font-semibold">
                  {
                    content
                      .replace(/<[^>]*>/g, "")
                      .split(/\s+/)
                      .filter((word) => word).length
                  }
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Use the toolbar to format your text and add media
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
        }

        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 12px 0;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        [contenteditable] blockquote {
          border-left: 4px solid #3b82f6;
          margin: 20px 0;
          padding: 16px 20px;
          background: #f8fafc;
          border-radius: 2px;
          color: #475569;
          font-style: italic;
        }

        [contenteditable] ul,
        [contenteditable] ol {
          margin: 20px 0;
          padding-left: 28px;
        }

        [contenteditable] li {
          margin: 8px 0;
          line-height: 1.6;
        }

        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
          text-decoration-color: #93c5fd;
          text-underline-offset: 2px;
        }

        [contenteditable] a:hover {
          color: #1d4ed8;
          text-decoration-color: #60a5fa;
        }

        [contenteditable] h1 {
          font-size: 2.25rem;
          font-weight: bold;
          margin: 24px 0 16px 0;
          color: #1f2937;
        }

        [contenteditable] h2 {
          font-size: 1.875rem;
          font-weight: bold;
          margin: 20px 0 12px 0;
          color: #374151;
        }

        [contenteditable] h3 {
          font-size: 1.5rem;
          font-weight: semibold;
          margin: 16px 0 8px 0;
          color: #4b5563;
        }

        [contenteditable] p {
          margin: 12px 0;
          line-height: 1.7;
        }

        .prose h1,
        .prose h2,
        .prose h3 {
          margin-top: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NewsletterEditor;
