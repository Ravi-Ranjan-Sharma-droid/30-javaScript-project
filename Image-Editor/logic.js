        const uploadInput = document.getElementById("upload");
        const originalCanvas = document.getElementById("originalCanvas");
        const originalCtx = originalCanvas.getContext("2d");
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        let originalImageData;

        uploadInput.addEventListener("change", function () {
            const file = uploadInput.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    originalCanvas.width = canvas.width = img.width;
                    originalCanvas.height = canvas.height = img.height;
                    originalCtx.drawImage(img, 0, 0);
                    ctx.drawImage(img, 0, 0);
                    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        function invertImage() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function mirrorImage() {
            const width = canvas.width;
            const height = canvas.height;
            const imageData = ctx.getImageData(0, 0, width, height);
            const mirroredData = ctx.createImageData(width, height);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;
                    const mirrorIndex = (y * width + (width - x - 1)) * 4;
                    mirroredData.data.set(imageData.data.slice(index, index + 4), mirrorIndex);
                }
            }
            ctx.putImageData(mirroredData, 0, 0);
        }

        function blurImage() {
            ctx.filter = "blur(3px)";
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = "none";
        }

        function enhanceImage() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] + 30);
                data[i + 1] = Math.min(255, data[i + 1] + 30);
                data[i + 2] = Math.min(255, data[i + 2] + 30);
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function flipImage() {
            const width = canvas.width;
            const height = canvas.height;
            const imageData = ctx.getImageData(0, 0, width, height);
            const flippedData = ctx.createImageData(width, height);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;
                    const flipIndex = ((height - y - 1) * width + x) * 4;
                    flippedData.data.set(imageData.data.slice(index, index + 4), flipIndex);
                }
            }
            ctx.putImageData(flippedData, 0, 0);
        }

        function resetImage() {
            if (originalImageData) {
                ctx.putImageData(originalImageData, 0, 0);
            }
        }

        function downloadImage() {
            const link = document.createElement('a');
            link.download = 'edited_image.png';
            link.href = canvas.toDataURL();
            link.click();
        }