import React, { PureComponent, RefObject } from 'react';
import { stylesFactory, Field, Switch } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { css } from 'emotion';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import { SimpleOptions } from './types';
import MyField from './components/MyField';
import './style.css';

const getStyles = stylesFactory(() => ({
  span: css`
    padding: 2px;
    opacity: .6;
    font-size: 12px;
  `,
}));

export interface SimpleEditor {
  editorRef: RefObject<HTMLElement> | any;
  cm: CodeMirror.EditorFromTextArea;
  styles: any;
}

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  constructor(props: any) {
    super(props);

    this.editorRef = React.createRef();
    this.styles = getStyles();
  }

  componentDidMount() {
    this.cm = CodeMirror.fromTextArea(this.editorRef.current, {
      theme: 'darcula',
      mode: 'javascript',
      tabSize: 2,
    });

    this.cm.on('blur', (cm: any) => {
      this.props.onOptionsChange({ ...this.props.options, getOption: cm.doc.getValue() });
    });

    // bad hack: try to fix Fix display problems when CodeMoirror is initialized
    setTimeout(() => this.cm.refresh(), 0);
  }

  componentWillUnmount() {
    if (this.cm) {
      this.cm.toTextArea();
    }
  }

  onChange (e: React.FormEvent<HTMLInputElement>) {
    this.props.onOptionsChange({ ...this.props.options, followTheme: (e.target as HTMLInputElement).checked });
  };

  render() {
    const funcStart = 'function (data, theme, echartsInstance) {';
    const funcEnd = '}';
    const FieldEl = Field || MyField;
    return (
      <>
        <FieldEl label="Follow Grafana Theme" description="Use default theme or follow theme of grafana (light or dark).">
          <Switch checked={this.props.options.followTheme} value={this.props.options.followTheme} onChange={(e) => this.onChange(e)} />
        </FieldEl>
        <FieldEl label="Echarts Option" description="Return options called by echarts or just use echartsInstance.setOption(...).">
          <>
            <span className={this.styles.span}>{funcStart}</span>
            <textarea ref={this.editorRef} value={this.props.options.getOption} />
            <span className={this.styles.span}>{funcEnd}</span>
          </>
        </FieldEl>
      </>
    );
  }
}