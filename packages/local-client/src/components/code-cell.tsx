import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';
import { useCumulatievCode } from '../hooks/use-cumulative-code';



interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(state => state.bundles[cell.id]);

  const cumilativeCode = useCumulatievCode(cell.id);

  // variables which are passed as a prop or a declared inside
  // of the component should be passed into the useEffect dependencies []
  useEffect(() => {

    if (!bundle) {
      createBundle(cell.id, cumilativeCode);
      return;
    }

    const t = setTimeout(async () => {
      createBundle(cell.id, cumilativeCode);
    }, 750);

    return () => {
      clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumilativeCode, cell.id, createBundle]);
  // if one of the listed dependencies values are changed react will call the useEffect function

  return (
    <Resizable direction='vertical'>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />

        </Resizable>
        <div className='progress-wrapper'>
          {
            !bundle || bundle.loading
              ? (
                <div className='progress-cover'>
                  <progress className='progress is-small is-primary' value='20' max='100'>
                    Loading
                  </progress>
                </div>
              )
              : (<Preview code={bundle.code} err={bundle.err} />)
          }
        </div>

      </div>
    </Resizable>
  );
};

export default CodeCell;
