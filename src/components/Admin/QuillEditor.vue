<template>
  <div ref="quillEditorElement" id="quillEditor"></div>
</template>

<script>
import {ref, onMounted, onUnmounted} from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import api from "../../api/index.js";


export default {
  name: 'QuillEditor',
  setup() {
    const quillEditorElement = ref(null);

    let quillEditor = null;

    const handleImageUpload = (file) => {
      return api.uploadFile(file).then(response => {
        return response.data;
      });
    };

    var ResizeImage = function(quill, options) {
      this.quill = quill;
      this.options = options;
      this.initialize();
    };

    ResizeImage.prototype.initialize = function() {
      var self = this;
      this.imgs = [];
      this.deltaX = 0;
      this.deltaY = 0;
      this.quill.root.addEventListener("mousedown", function(evt) {
        if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === "IMG") {
          self.imgs.push(evt.target);
          self.deltaX = evt.clientX;
          self.deltaY = evt.clientY;
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
      this.quill.root.addEventListener("mousemove", function(evt) {
        if (self.imgs.length > 0) {
          var dX = evt.clientX - self.deltaX;
          var dY = evt.clientY - self.deltaY;
          self.deltaX = evt.clientX;
          self.deltaY = evt.clientY;
          self.imgs.forEach(function(img) {
            console.log(this);
            img.style.width = img.clientWidth + dX + "px";
            img.style.height = "auto";
          });
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
      this.quill.root.addEventListener("mouseup", function(evt) {
        if (self.imgs.length > 0) {
          self.imgs = [];
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
    };

    Quill.register("modules/resizeImage", ResizeImage);

    onMounted(() => {
      const editor = quillEditorElement.value;
      if (editor) {
        quillEditor = new Quill(editor, {
          modules: {
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
              [{'font': []}],
              [{'align': []}],
              ['image'],
              ['clean']
            ],
          },
          theme: 'snow'
        });

        quillEditor.getModule('toolbar').addHandler('image', () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.addEventListener('change', () => {
            const file = input.files[0];
            handleImageUpload(file).then((url) => {
              const range = quillEditor.getSelection(true);
              quillEditor.insertEmbed(range.index, 'image', url);
            });
          });
        });
      }
    });

    onUnmounted(() => {
      quillEditorElement.value = null;
    });

    const getContent = () => {
      return quillEditorElement.value.querySelector('.ql-editor').innerHTML;
    }

    return {
      quillEditorElement,
      getContent
    }
  }
}
</script>

<style scoped>
#quillEditor {
  font-size: 20px;
  height: 80vh;
}
</style>