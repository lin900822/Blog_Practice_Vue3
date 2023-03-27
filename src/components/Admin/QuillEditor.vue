<template>
  <div ref="quillEditor" id="quillEditor"></div>
</template>

<script>
import {ref, onMounted} from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  name: 'QuillEditor',
  setup() {
    const quillEditor = ref(null);

    onMounted(() => {
      const editor = quillEditor.value;
      if (editor) {
        new Quill(editor, {
          modules: {
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
            ]
          },
          theme: 'snow'
        });
      }
    });

    const getContent = () => {
      return quillEditor.value.querySelector('.ql-editor').innerHTML;
    }

    return {
      quillEditor,
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