const mirror = document.getElementById('mirror');
            const reflections = mirror.querySelectorAll('.reflection');
        
            document.addEventListener('mousemove', (e) => {
            const rect = mirror.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
        
            const offsetX = (e.clientX - centerX) / rect.width;
            const offsetY = (e.clientY - centerY) / rect.height;
        
            reflections.forEach((el, i) => {
                const depth = (i + 1) * 4;
                const translateX = offsetX * depth;
                const translateY = offsetY * depth;
        
                el.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px)`;
            });
            });