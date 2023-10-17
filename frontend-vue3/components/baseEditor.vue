<template>
  <button @click="save">
    save
  </button>
  <div
      id="editorjs"
      class="editor-holder"
  >
  </div>
</template>

<script>
import EditorJs from '@editorjs/editorjs';
import Checklist from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import NestedList from '@editorjs/nested-list';
import Quote from '@editorjs/quote';
import Raw from '@editorjs/raw';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import SimpleTest from '~/services/customDeliver.js'
import CustomDelimiter from "~/services/customDeliver.js";

export default {
  data() {
    return {
      editor: null
    }
  },
  methods: {
    save () {
  this.editor.save()
      .then((savedData) => {
        // cPreview.show(savedData, document.getElementById("output"));
      })
      .catch((error) => {
        console.error('Saving error', error);
      });
}
  },
  mounted() {
    this.editor = new EditorJs({
      i18n: {
        /**
         */
        messages: {
          /**
           * Other below: translation of different UI components of the editor.js core
           */
          "ui": {
            "blockTunes": {
              "toggler": {
                "Click to tune": "Нажмите, чтобы настроить",
                "or drag to move": "или перетащите"
              },
            },
            "inlineToolbar": {
              "converter": {
                "Convert to": "Конвертировать в"
              }
            },
            "toolbar": {
              "toolbox": {
                "Add": "Добавить",
              }
            },
            "popover": {
              "Filter": "Поиск",
              "Nothing found": "Ничего не найдено"
            }
          },

          /**
           * Section for translation Tool Names: both block and inline tools
           */
          "toolNames": {
            "Text": "Параграф",
            "Heading": "Заголовок",
            "List": "Список",
            "Warning": "Примечание",
            "Checklist": "Чеклист",
            "Quote": "Цитата",
            "Code": "Код",
            "Delimiter": "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            "Table": "Таблица",
            "Link": "Ссылка",
            "Marker": "Маркер",
            "Bold": "Полужирный",
            "Italic": "Курсив",
            "InlineCode": "Моноширинный",
            "Image": "Картинка"
          },

          /**
           * Section for passing translations to the external tools classes
           */
          "tools": {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            "warning": { // <-- 'Warning' tool will accept this dictionary section
              "Title": "Название",
              "Message": "Сообщение",
            },

            /**
             * Link is the internal Inline Tool
             */
            "link": {
              "Add a link": "Вставьте ссылку"
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            "stub": {
              'The block can not be displayed correctly.': 'Блок не может быть отображен'
            },
            "image": {
              "Caption": "Подпись",
              "Select an Image": "Выберите файл",
              "With border": "Добавить рамку",
              "Stretch image": "Растянуть",
              "With background": "Добавить подложку",
            },
            "code": {
              "Enter a code": "Код",
            },
            "linkTool": {
              "Link": "Ссылка",
              "Couldn't fetch the link data": "Не удалось получить данные",
              "Couldn't get this link data, try the other one": "Не удалось получить данные по ссылке, попробуйте другую",
              "Wrong response format from the server": "Неполадки на сервере",
            },
            "header": {
              "Header": "Заголовок",
            },
            "paragraph": {
              "Enter something": "Введите текст"
            },
            "list": {
              "Ordered": "Нумерованный",
              "Unordered": "Маркированный",
            }
          },

          /**
           * Section allows to translate Block Tunes
           */
          "blockTunes": {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */
            "delete": {
              "Delete": "Удалить",
              "Click to delete": "Нажмите для удаления"
            },
            "moveUp": {
              "Move up": "Переместить вверх"
            },
            "moveDown": {
              "Move down": "Переместить вниз"
            }
          },
        }
      },
      autofocus: true,
      placeholder: 'Начните вводить текст',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link', 'marker'],
        },
        image: {
          class: ImageTool,
          inlineToolbar: true,
          config: {
            types: 'image/jpeg, image/jpg, image/png, image/gif, video/mp4, video/quicktime',
            field: 'media',
            /**
             * Custom uploader to emulate image uploading without backend
             * @see https://github.com/editor-js/image#providing-custom-uploading-methods
             */
            uploader: {
              uploadByFile(file) {
                return new Promise((resolve) => {
                  const reader = new FileReader();

                  reader.onload = () => {
                    resolve({
                      success: 1,
                      file: {
                        url: reader.result,
                      }
                    })
                  };
                  reader.onerror = () => {
                    resolve({
                      success: 0,
                    })
                  };

                  reader.readAsDataURL(file);
                });
              },
              uploadByUrl(url){
                return new Promise((resolve) => {
                  resolve({
                    success: 1,
                    file: {
                      url
                    }
                  })
                })
              }
            }
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true
        },
        code: {
          class: Code,
          shortcut: 'CMD+SHIFT+D',
          toolbox: {
            // icon: '<svg>my icon code</svg>',
            title: 'Блок кода'
          }
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        delimiter: {
          class: CustomDelimiter,
        },
        embed: Embed,
        table: {
          class: Table,
          inlineToolbar: true
        },
        raw: Raw,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        warning: Warning,
        checklist: Checklist,
      },
    })
  }
}
</script>

<style lang="postcss">


.codex-editor--toolbox-opened .ce-block:first-child .ce-paragraph[data-placeholder]:empty::before,
.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty:focus::before {
  opacity: .8 !important;
}
</style>