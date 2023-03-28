import Quill from 'quill';

const Module = Quill.import('core/module');
const Parchment = Quill.import('parchment');
// const Resize = Quill.import('ui/resize');

class CustomImageResize extends Module {
    constructor(quill, options) {
        super(quill, options);

        this.quill = quill;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.quill.root.addEventListener('mousedown', this.handleMouseDown);
        this.quill.root.addEventListener('touchstart', this.handleTouchStart);

        this.resizer = document.createElement('div');
        this.resizer.classList.add('ql-custom-image-resize');
    }

    handleMouseDown(event) {
        const target = event.target;
        if (target.tagName === 'IMG') {
            event.preventDefault();
            this.img = target;
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.width = this.img.width;
            this.height = this.img.height;

            this.quill.root.addEventListener('mousemove', this.handleMouseMove);
            this.quill.root.addEventListener('mouseup', this.handleMouseUp);

            this.quill.root.classList.add('ql-custom-image-resize-container');
            this.quill.root.appendChild(this.resizer);
            this.updateResizer();
        }
    }

    handleMouseMove(event) {
        event.preventDefault();
        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;
        const ratio = this.width / this.height;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.width += deltaX;
            this.height = this.width / ratio;
        } else {
            this.height += deltaY;
            this.width = this.height * ratio;
        }
        this.img.width = this.width;
        this.img.height = this.height;
        this.updateResizer();
    }

    handleMouseUp(event) {
        event.preventDefault();
        this.quill.root.removeEventListener('mousemove', this.handleMouseMove);
        this.quill.root.removeEventListener('mouseup', this.handleMouseUp);
        this.quill.root.classList.remove('ql-custom-image-resize-container');
        this.quill.root.removeChild(this.resizer);
        this.update();
    }

    handleTouchStart(event) {
        const target = event.target;
        if (target.tagName === 'IMG') {
            event.preventDefault();
            this.img = target;
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
            this.width = this.img.width;
            this.height = this.img.height;

            this.quill.root.addEventListener('touchmove', this.handleTouchMove);
            this.quill.root.addEventListener('touchend', this.handleTouchEnd);

            this.quill.root.classList.add('ql-custom-image-resize-container');
            this.quill.root.appendChild(this.resizer);
            this.updateResizer();
        }
    }

    handleTouchMove(event) {
        event.preventDefault();
        const deltaX = event.touches[0].clientX - this.startX;
        const deltaY = event.touches[0].clientY - this.startY;
        const ratio = this.width / this.height;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.width += deltaX;
            this.height = this.width / ratio;
        } else {
            this.height += deltaY;
            this.width = this.height * ratio;
        }
        this.img.width = this.width;
        this.img.height = this.height;
        this.updateResizer();
    }

    handleTouchEnd(event) {
        event.preventDefault();
        this.quill.root.removeEventListener('touchmove', this.handleTouchMove);
        this.quill.root.removeEventListener('touchend', this.handleTouchEnd);
        this.quill.root.classList.remove('ql-custom-image-resize-container');
        this.quill.root.removeChild(this.resizer);
        this.update();
    }

    update() {
        this.quill.update();
    }

    updateResizer() {
        const imgRect = this.img.getBoundingClientRect();
        const resizerRect = this.resizer.getBoundingClientRect();
        this.resizer.style.left = imgRect.left + window.pageXOffset + (imgRect.width - resizerRect.width) / 2 + 'px';
        this.resizer.style.top = imgRect.top + window.pageYOffset + (imgRect.height - resizerRect.height) / 2 + 'px';
    }

    onDestroy() {
        this.quill.root.removeEventListener('mousedown', this.handleMouseDown);
        this.quill.root.removeEventListener('touchstart', this.handleTouchStart);
    }
}

Quill.register('modules/customImageResize', CustomImageResize);

export default CustomImageResize;