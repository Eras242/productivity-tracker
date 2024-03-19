import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
  FloatingMenu,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MdFormatBold } from "react-icons/md";
import { MdFormatItalic } from "react-icons/md";
import { MdFormatStrikethrough } from "react-icons/md";
import { MdOutlineCode } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { MdOutlineRemove } from "react-icons/md";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { MdFormatQuote } from "react-icons/md";
import { MdOutlineWrapText } from "react-icons/md";

import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { TTaskDay } from "./Contexts/TasksContext";
import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { TTask } from "./Contexts/TasksContext";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  // console.log(editor.getHTML());

  return (
    <div className="tiptap-menu-container">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "tbtn is-active" : "tbtn"}
      >
        <MdFormatBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "tbtn is-active" : "tbtn"}
      >
        <MdFormatItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "tbtn is-active" : "tbtn"}
      >
        <MdFormatStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "tbtn is-active" : "tbtn"}
      >
        <MdOutlineCode />
      </button>
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button> */}
      {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "tbtn is-active" : "tbtn"
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "tbtn is-active" : "tbtn"
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "tbtn is-active" : "tbtn"
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 }) ? "tbtn is-active" : "tbtn"
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 }) ? "tbtn is-active" : "tbtn"
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 }) ? "tbtn is-active" : "tbtn"
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "tbtn is-active" : "tbtn"}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "tbtn is-active" : "tbtn"}
      >
        <MdFormatListNumbered />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "tbtn is-active" : "tbtn"}
      >
        <HiOutlineCodeBracketSquare />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "tbtn is-active" : "tbtn"}
      >
        <MdFormatQuote />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="tbtn"
      >
        <MdOutlineRemove />
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="tbtn"
      >
        <MdOutlineWrapText />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="tbtn"
      >
        <BiUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="tbtn"
      >
        <BiRedo />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }
      >
        purple
      </button> */}
    </div>
  );
};

export const TipTap = ({
  editorContent,
  setEditorContent,
  onChangeForm,
  formDetails,
  setFormDetails,
  submitTask,
}: {
  editorContent: string;
  submitTask: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => boolean;
  setFormDetails: React.Dispatch<React.SetStateAction<TTask>>;
  onChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  formDetails: TTask;
}) => {
  const extensions = [StarterKit];
  const [init, setInit] = useState<boolean>(false);
  let content;

  useEffect(() => {
    content = editorContent;
    editor?.commands.focus();
  }, [init]);

  const initText = `<p>
      this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
  `;
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setFormDetails((prev) => ({
        ...prev,
        task: {
          ...prev.task,
          taskItem: {
            ...prev.task.taskItem,
            body: editor.getHTML(),
          },
        },
      }));
    },
  });

  const initTextSpring = useSpring({
    from: { opacity: init ? "0" : "0.1" },
    to: { opacity: init ? "0" : "0.1" },
  });

  if (!editor) {
    return null;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const result = submitTask(e);
    if (result) {
      editor.commands.setContent(`<p><p/>`);
    }
  };

  return (
    <>
      <MenuBar editor={editor} />
      <input
        type="text"
        className="tiptap-title "
        name="title"
        placeholder="Title..."
        onChange={onChangeForm}
        value={formDetails.task.taskItem.title}
      />
      <animated.div className="tiptap-container">
        {init ? <EditorContent editor={editor} /> : ""}
        {!init && (
          <animated.p
            className="init-text"
            style={{ ...initTextSpring }}
            onClick={() => setInit(true)}
          >
            {parse(initText)}
          </animated.p>
        )}
      </animated.div>
      <div style={{ display: "flex", width: "100%", position: "absolute" }}>
        <input name="time" type="time" onChange={onChangeForm} />
        <button className="btn" onClick={handleSubmit}>
          Add Task
        </button>
        <button className="btn">Templates</button>
      </div>
    </>
  );
};
