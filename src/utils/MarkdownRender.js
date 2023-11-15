import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';

function MarkdownRender({ source, ...props }) {
  const newProps = {
    ...props,
    remarkPlugins: [
      RemarkMathPlugin,
    ],
    components: {
      ...props.components,
      math: (props) =>
        <MathJax.Node formula={props.value} />,
      inlineMath: (props) =>
        <MathJax.Node inline formula={props.value} />
    }
  };

  return (
    <MathJax.Provider input="tex">
      <ReactMarkdown {...newProps}>{source}</ReactMarkdown>
    </MathJax.Provider>
  );
}

export default MarkdownRender;