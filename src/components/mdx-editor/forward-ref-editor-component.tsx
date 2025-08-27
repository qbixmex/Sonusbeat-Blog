'use client';

import { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import type { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(
  () => import('./initialized-mdx-editor.component'),
  { ssr: false }
);

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />
);

ForwardRefEditor.displayName = 'ForwardRefEditor';