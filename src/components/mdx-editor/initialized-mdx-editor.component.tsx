'use client';

import type { ForwardedRef } from 'react';
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  ListsToggle,
  DiffSourceToggleWrapper,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  // Plugins
  toolbarPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  markdownShortcutPlugin,
  linkDialogPlugin,
  linkPlugin,
  thematicBreakPlugin,
  tablePlugin,
  diffSourcePlugin,
  codeBlockPlugin,
  Separator,
  MDXEditor,
  codeMirrorPlugin,
  type MDXEditorMethods,
  type MDXEditorProps
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css'
import { basicDark } from 'cm6-theme-basic-dark';
import './theme.css';

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className="dark-theme dark-editor"
      contentEditableClassName="prose"
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        markdownShortcutPlugin(),
        thematicBreakPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            txt: 'text',
            js: 'JavaScript',
            ts: 'TypeScript',
            sass: 'SASS',
            css: 'CSS',
            py: 'Python',
            java: 'Java',
            kt: 'Kotlin',
            c: 'C',
            "c++": 'C++',
            php: 'PHP',
          },
          codeMirrorExtensions: [basicDark]
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CodeToggle />
              <CreateLink />
              <Separator />
              <ListsToggle />
              <Separator />
              <InsertTable />
              <InsertCodeBlock />
              <InsertThematicBreak />
              <Separator />
              <UndoRedo />
            </DiffSourceToggleWrapper>
          )
        }),
        diffSourcePlugin({
          viewMode: 'rich-text',
          diffMarkdown: props.markdown,
          codeMirrorExtensions: [basicDark],
          readOnlyDiff: true,
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}