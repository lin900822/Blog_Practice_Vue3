<template>
  <div ref="quillEditorElement" id="quillEditor"></div>
  <ResourceSelector selectorId="quill-editor" ref="resourceSelectorRef" :on-selected="handleResourceSelected"></ResourceSelector>
</template>

<script>
import {onMounted, onUnmounted, ref} from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from "highlight.js/lib/core";
import ResourceSelector from "./ResourceSelector.vue";

export default {
  name: 'QuillEditor',
  components: {ResourceSelector},
  setup() {
    const quillEditorElement = ref(null);
    const resourceSelectorRef = ref();

    // const handleImageUpload = (file) => {
    //   return api.uploadFile(file).then(response => {
    //     return response.data;
    //   });
    // };

    var ResizeImage = function (quill, options) {
      this.quill = quill;
      this.options = options;
      this.initialize();
    };

    ResizeImage.prototype.initialize = function () {
      var self = this;
      this.imgs = [];
      this.deltaX = 0;
      this.deltaY = 0;
      this.quill.root.addEventListener("mousedown", function (evt) {
        if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === "IMG") {
          self.imgs.push(evt.target);
          self.deltaX = evt.clientX;
          self.deltaY = evt.clientY;
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
      this.quill.root.addEventListener("mousemove", function (evt) {
        if (self.imgs.length > 0) {
          var dX = evt.clientX - self.deltaX;
          var dY = evt.clientY - self.deltaY;
          self.deltaX = evt.clientX;
          self.deltaY = evt.clientY;
          self.imgs.forEach(function (img) {
            img.style.width = img.clientWidth + dX + "px";
            img.style.height = "auto";
          });
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
      this.quill.root.addEventListener("mouseup", function (evt) {
        if (self.imgs.length > 0) {
          let editorWidth = self.quill.root.offsetWidth;
          self.imgs.forEach(function (img) {
            let ratio = (img.clientWidth / editorWidth) * 100;
            img.style.width = ratio + "%";
            img.style.minWidth = "10%";
            img.style.height = "auto";
          });
          self.imgs = [];
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
    };

    Quill.register("modules/resizeImage", ResizeImage);

    let quillEditor = null;

    onMounted(() => {
      const editor = quillEditorElement.value;
      if (editor) {
        quillEditor = new Quill(editor, {
          modules: {
            syntax: {
              highlight: text => hljs.highlightAuto(text).value,
              syntax: 'java' // 设置默认语言为 JavaScript
            },
            resizeImage: true,
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{'header': 1}, {'header': 2}],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              [{'direction': 'rtl'}],
              [{'size': ['small', false, 'large', 'huge']}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
              ['image', 'video', 'link'],
              ['clean']
            ],
          },
          theme: 'snow'
        });

        quillEditor.getModule('toolbar').addHandler('image', () => {
          resourceSelectorRef.value.open();
          // const input = document.createElement('input');
          // input.setAttribute('type', 'file');
          // input.setAttribute('accept', 'image/*');
          // input.click();
          //
          // input.addEventListener('change', () => {
          //   const file = input.files[0];
          //   handleImageUpload(file).then((url) => {
          //     const range = quillEditor.getSelection(true);
          //     quillEditor.insertEmbed(range.index, 'image', url);
          //   });
          // });
        });

        quillEditor.on('editor-change', (eventName, delta, oldDelta) => {
          // 在这里编写事件处理逻辑
          const blocks = document.querySelectorAll('.ql-syntax');
          blocks.forEach((block) => {
            block.style.backgroundColor = '#474949';
            block.style.color = '#f8f8f2';
            block.style.fontSize = '14px';
            block.style.lineHeight = '30px';
          });
        });

      }
    });

    onUnmounted(() => {
      quillEditorElement.value = null;
    });

    const getContent = () => {
      return quillEditorElement.value.querySelector('.ql-editor').innerHTML;
    };

    const setContent = (content) => {
      quillEditorElement.value.querySelector('.ql-editor').innerHTML = content;
    };

    const handleResourceSelected = (value) => {
      resourceSelectorRef.value.close();
      const range = quillEditor.getSelection(true);
      quillEditor.insertEmbed(range.index, 'image', value);
    }

    return {
      quillEditorElement,
      resourceSelectorRef,
      getContent,
      setContent,
      handleResourceSelected
    }
  }
}

</script>

<style scoped>
#quillEditor {
  font-size: 20px;
  height: 80vh;
}

pre.ql-syntax {
  padding: 10px;
  background-color: #474949;
  color: #f8f8f2;
  font-size: 16px;
  line-height: 30px;
}

#quillEditor :deep(.ql-editor) {
  margin-top: 0px;
}

#quillEditor :deep(*) {
  font-size: 20px;
  line-height: 36px;
  margin-top: 30px;
}

#quillEditor :deep(h2) {
  font-size: 36px;
  font-weight: bolder;
}

#quillEditor :deep(h3) {
  font-size: 26px;
  font-weight: bold;
}

#quillEditor :deep(img) {
  max-width: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  margin-right: 20px;
}

#quillEditor :deep(li) {
  margin-top: 10px;
}

#quillEditor :deep(pre) {
  padding: 10px;
  background-color: #474949;
  color: #f8f8f2;
  font-size: 16px;
  line-height: 30px;
}

#quillEditor :deep(pre) span {
  font-size: 16px;
  line-height: 30px;
}

</style>