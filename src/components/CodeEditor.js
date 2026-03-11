// CodeEditor.js — CodeMirror 6 封装
// 支持 R/Python/XML 切换，oneDark 主题，onChange 回调
// 移动端 <768px 默认只读，显示"点击编辑"按钮

import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { r } from 'codemirror-lang-r';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

/**
 * 根据语言名称返回对应的 CodeMirror language extension（或空数组作为回退）
 * @param {'r'|'python'|'xml'} lang
 * @returns {import('@codemirror/state').Extension}
 */
function getLangExtension(lang) {
  if (lang === 'python') return python();
  if (lang === 'r') return r();
  // 'xml' / 'html' 等：当前未安装对应语言包，返回空数组（使用基础编辑器）
  return [];
}

/**
 * 创建 CodeMirror 6 编辑器
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {string} options.code - 初始代码
 * @param {'r'|'python'|'xml'} options.language - 语言
 * @param {Function} options.onChange - 内容变化回调
 * @param {boolean} options.readOnly - 强制只读
 * @returns {{ view: EditorView, getCode: Function, setCode: Function, destroy: Function }}
 */
export function createCodeEditor(container, {
  code = '',
  language = 'r',
  onChange = null,
  readOnly = false
} = {}) {
  // 创建外层包装
  const wrapper = document.createElement('div');
  wrapper.className = 'code-editor-wrapper';
  container.appendChild(wrapper);

  const isMobile = window.innerWidth < 768;
  const isReadOnly = readOnly || isMobile;

  // 构建 extensions
  const extensions = [
    basicSetup,
    oneDark,
    getLangExtension(language),
    EditorView.theme({
      '&': {
        fontSize: isMobile ? '13px' : '14px',
        borderRadius: '12px',
        overflow: 'hidden'
      },
      '.cm-content': {
        fontFamily: 'var(--font-code)',
        padding: '16px'
      },
      '.cm-gutters': {
        borderRight: 'none',
        background: 'transparent'
      },
      '.cm-scroller': {
        overflow: 'auto'
      },
      '&.cm-focused': {
        outline: 'none'
      }
    })
  ];

  // onChange 回调
  if (onChange) {
    extensions.push(EditorView.updateListener.of(update => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    }));
  }

  // 只读设置
  if (isReadOnly) {
    extensions.push(EditorView.editable.of(false));
  }

  // 创建编辑器
  const view = new EditorView({
    doc: code,
    extensions,
    parent: wrapper
  });

  // 移动端：添加只读遮罩 + "点击编辑"按钮
  let overlay = null;
  if (isMobile && !readOnly) {
    overlay = document.createElement('div');
    overlay.className = 'code-editor-readonly-overlay';
    overlay.innerHTML = '<button class="edit-btn">点击编辑</button>';
    wrapper.appendChild(overlay);

    overlay.querySelector('.edit-btn').addEventListener('click', () => {
      // 移除遮罩，重建可编辑编辑器
      overlay.remove();
      overlay = null;

      // 获取当前内容
      const currentCode = view.state.doc.toString();
      view.destroy();

      // 重建为可编辑
      const editableExtensions = [
        basicSetup,
        oneDark,
        getLangExtension(language),
        EditorView.theme({
          '&': {
            fontSize: '13px',
            borderRadius: '12px',
            overflow: 'hidden'
          },
          '.cm-content': {
            fontFamily: 'var(--font-code)',
            padding: '16px'
          },
          '.cm-gutters': {
            borderRight: 'none',
            background: 'transparent'
          },
          '.cm-scroller': {
            overflow: 'auto'
          },
          '&.cm-focused': {
            outline: 'none'
          }
        })
      ];

      if (onChange) {
        editableExtensions.push(EditorView.updateListener.of(update => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }));
      }

      const newView = new EditorView({
        doc: currentCode,
        extensions: editableExtensions,
        parent: wrapper
      });

      // 更新引用
      result.view = newView;
    });
  }

  const result = {
    view,

    /** 获取当前代码 */
    getCode() {
      return result.view.state.doc.toString();
    },

    /** 设置代码内容 */
    setCode(newCode) {
      result.view.dispatch({
        changes: {
          from: 0,
          to: result.view.state.doc.length,
          insert: newCode
        }
      });
    },

    /** 销毁编辑器 */
    destroy() {
      if (overlay) overlay.remove();
      result.view.destroy();
      wrapper.remove();
    }
  };

  return result;
}
