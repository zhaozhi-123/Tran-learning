class BubbleSortVisualizer {
    constructor() {
        this.barsContainer = document.getElementById('bars-container');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.generateBtn = document.getElementById('generate-btn');
        this.speedSlider = document.getElementById('speed');
        
        this.array = [];
        this.arraySize = 30;
        this.speed = 300;
        this.isSorting = false;
        
        this.init();
    }
    
    init() {
        this.generateArray();
        this.renderBars();
        this.bindEvents();
    }
    
    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 200) + 10);
        }
    }
    
    renderBars() {
        this.barsContainer.innerHTML = '';
        
        this.array.forEach(value => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${value}px`;
            this.barsContainer.appendChild(bar);
        });
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startSort());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.generateBtn.addEventListener('click', () => this.generateNewArray());
        this.speedSlider.addEventListener('input', (e) => {
            this.speed = 1050 - parseInt(e.target.value);
        });
    }
    
    generateNewArray() {
        if (this.isSorting) return;
        this.generateArray();
        this.renderBars();
        this.resetSteps();
    }
    
    reset() {
        if (this.isSorting) return;
        this.renderBars();
        this.resetSteps();
    }
    
    resetSteps() {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
    }
    
    async startSort() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.startBtn.disabled = true;
        this.generateBtn.disabled = true;
        
        await this.bubbleSort();
        
        this.isSorting = false;
        this.startBtn.disabled = false;
        this.generateBtn.disabled = false;
    }
    
    async bubbleSort() {
        const n = this.array.length;
        const bars = document.querySelectorAll('.bar');
        
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                // 高亮当前比较的元素
                bars[j].classList.add('comparing');
                bars[j + 1].classList.add('comparing');
                
                // 显示步骤 1 和 2
                this.highlightStep(1);
                await this.sleep(this.speed);
                
                if (this.array[j] > this.array[j + 1]) {
                    // 交换元素
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    
                    // 高亮交换的元素
                    bars[j].classList.add('swapping');
                    bars[j + 1].classList.add('swapping');
                    
                    // 更新UI
                    bars[j].style.height = `${this.array[j]}px`;
                    bars[j + 1].style.height = `${this.array[j + 1]}px`;
                    
                    // 显示步骤 2
                    this.highlightStep(2);
                    await this.sleep(this.speed);
                    
                    bars[j].classList.remove('swapping');
                    bars[j + 1].classList.remove('swapping');
                    
                    swapped = true;
                }
                
                // 移除高亮
                bars[j].classList.remove('comparing');
                bars[j + 1].classList.remove('comparing');
            }
            
            // 标记已排序的元素
            bars[n - i - 1].classList.add('sorted');
            
            // 显示步骤 3 和 4
            this.highlightStep(3);
            await this.sleep(this.speed / 2);
            this.highlightStep(4);
            await this.sleep(this.speed / 2);
            
            // 如果没有交换，说明数组已经有序
            if (!swapped) break;
        }
        
        // 标记最后一个元素为已排序
        bars[0].classList.add('sorted');
        
        // 显示步骤 5
        this.highlightStep(5);
        await this.sleep(this.speed);
    }
    
    highlightStep(stepNumber) {
        this.resetSteps();
        const step = document.getElementById(`step-${stepNumber}`);
        if (step) {
            step.classList.add('active');
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化可视化器
window.addEventListener('DOMContentLoaded', () => {
    new BubbleSortVisualizer();
});