import * as React from 'react';
import MarkdownEditor from '../../components/write/MarkdownEditor';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { changeMarkdown, changeTitle } from '../../modules/write';

import remark from 'remark';
import htmlPlugin from 'remark-html';
import breaks from 'remark-breaks';

interface OwnProps {}
interface StateProps {
  title: string;
  markdown: string;
}
interface DispatchProps {
  changeMarkdown: typeof changeMarkdown;
  changeTitle: typeof changeTitle;
}
type MarkdownEditorContainerProps = OwnProps & StateProps & DispatchProps;

const MarkdownEditorContainer: React.SFC<MarkdownEditorContainerProps> = ({
  changeMarkdown,
  changeTitle,
  title,
  markdown,
}) => {
  const onConvert = (markdown: string) => {
    remark()
      .use(breaks)
      .use(htmlPlugin)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);
        console.log(html);
      });
  };
  return (
    <MarkdownEditor
      title={title}
      markdown={markdown}
      onChangeMarkdown={changeMarkdown}
      onChangeTitle={changeTitle}
      onConvert={onConvert}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    title: state.write.title,
    markdown: state.write.markdown,
  }),
  {
    changeMarkdown,
    changeTitle,
  },
)(MarkdownEditorContainer);
