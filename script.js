class BeautyCopywriter {
    constructor() {
        this.initElements();
        this.initEvents();
        this.initAPI();
        this.initTemplates();
    }

    initElements() {
        this.keywordInput = document.getElementById('keyword');
        this.productTypeSelect = document.getElementById('product-type');
        this.styleSelect = document.getElementById('style');
        this.lengthSelect = document.getElementById('length');
        this.aiModelSelect = document.getElementById('ai-model');
        this.generateBtn = document.getElementById('generate-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.outputContent = document.getElementById('output-content');
        this.outputSection = document.getElementById('output-section');
    }

    initEvents() {
        this.generateBtn.addEventListener('click', () => this.generateCopy());
        this.copyBtn.addEventListener('click', () => this.copyCopy());
    }

    initAPI() {
        // 后端已处理 API Key，前端无需管理
    }

    initTemplates() {
        // 预定义文案模板
        this.templates = {
            'lipstick': {
                'fashion': {
                    'short': '💄 这款{keyword}太惊艳了！显色度超高，质地丝滑，持久度也很赞。涂上瞬间气场全开，是今年必入的流行色号！✨',
                    'medium': '💄 超爱这款{keyword}！显色饱满，质地轻盈，上嘴丝滑不拔干。无论是日常妆容还是派对造型都能轻松hold住。持久度出色，一整天都不用补涂，是美妆博主们的心头爱！✨',
                    'long': '💄 强烈推荐这款{keyword}！它拥有浓郁的色彩饱和度，上嘴瞬间显色，丝滑的质地让涂抹过程变得无比享受。持久度更是让人惊喜，即使喝水吃饭也不易脱色，省去了频繁补妆的烦恼。这款口红适合各种场合，无论是日常通勤还是约会派对，都能让你成为焦点。包装设计精致时尚，拿在手里质感十足，是美妆爱好者们的必备单品！✨'
                },
                'professional': {
                    'short': '{keyword}具有良好的显色度和遮盖力，质地滋润易涂抹。成分安全，不含刺激性物质，适合敏感肌肤使用。',
                    'medium': '{keyword}采用先进的配方技术，显色度高，遮盖力强，同时保持滋润感。质地轻盈不厚重，长时间佩戴无负担。成分安全温和，经过严格检测，适合各种肌肤类型使用。',
                    'long': '{keyword}是一款专业级别的口红产品。它采用先进的色彩调配技术，提供高度饱和的颜色和出色的遮盖力。质地经过精心调配，既保持滋润度又不会过于油腻，确保舒适的佩戴体验。产品配方不含对羟基苯甲酸酯、硫酸盐等刺激性成分，通过了严格的安全性检测，适合敏感肌肤人群使用。无论是专业化妆师还是日常消费者，都能从中获得满意的效果。'
                },
                'humorous': {
                    'short': '{keyword}简直是我的救星！每次涂上它，连我妈都夸我气色好，以为我恋爱了呢！😄',
                    'medium': '{keyword}太神奇了！涂上它瞬间减龄十岁，连我家猫都开始黏我了。持久度超级棒，吃火锅都不会掉，简直是吃货的福音！😄',
                    'long': '{keyword}是我最近的新宠！涂上它不仅气色变好，连整个人的气质都提升了。质地丝滑，显色度高，关键是持久度超级棒，吃火锅、喝奶茶都不会掉，简直是吃货们的必备神器！每次用这款口红，朋友都会问我是不是换了新的男朋友，简直太开心了！😄'
                }
            },
            'foundation': {
                'fashion': {
                    'short': '🌼 这款{keyword}太好用了！质地轻薄服帖，遮瑕力适中，打造自然裸妆效果。持妆时间长，不易脱妆，是夏季必备的底妆产品！',
                    'medium': '🌼 超喜欢这款{keyword}！质地轻盈透气，上脸服帖自然，遮瑕力适中，能轻松遮盖毛孔和暗沉。持妆时间长达8小时，不易脱妆，是日常妆容的完美选择！',
                    'long': '🌼 强烈推荐这款{keyword}！它采用轻薄透气的配方，上脸瞬间贴合肌肤，打造自然裸妆效果。遮瑕力适中，能轻松遮盖毛孔、暗沉和轻微的瑕疵，让肌肤看起来更加细腻光滑。持久度出色，即使在炎热的夏季也能保持8小时不脱妆，是美妆爱好者们的心头爱！包装设计简约时尚，携带方便，适合日常使用！'
                },
                'professional': {
                    'short': '{keyword}配方温和，质地轻薄透气，适合各种肌肤类型。具有良好的遮瑕力和持妆效果，能持久保持妆容的完整性。',
                    'medium': '{keyword}采用高品质的原料和先进的生产工艺，质地轻薄透气，上脸服帖自然。具有良好的遮瑕力，能遮盖大部分肌肤瑕疵，同时保持肌肤的呼吸感。持妆时间长达8小时，不易脱妆，是专业化妆师的首选底妆产品。',
                    'long': '{keyword}是一款专业级别的粉底液产品。它采用温和的配方，质地轻薄透气，适合各种肌肤类型使用。具有出色的遮瑕力，能有效遮盖毛孔、暗沉、痘印和红血丝等肌肤瑕疵，同时保持肌肤的呼吸感。持久度长达10小时，即使在高温高湿度的环境下也能保持妆容的完整性。产品经过严格的安全检测，不含对羟基苯甲酸酯、香料等刺激性成分，适合敏感肌肤人群使用。无论是专业化妆师还是日常消费者，都能从中获得满意的效果。'
                },
                'humorous': {
                    'short': '{keyword}简直是我的素颜神器！涂上它瞬间变成伪素颜，连我爸都没看出来我化妆了！😜',
                    'medium': '{keyword}太厉害了！它能让我的脸看起来像剥了壳的鸡蛋，连我家狗都忍不住舔我的脸。持妆效果超级棒，跑步出汗都不会脱妆！😜',
                    'long': '{keyword}是我最近发现的宝藏底妆产品！它的质地轻薄透气，上脸服帖自然，能轻松打造出伪素颜效果。遮瑕力适中，能遮盖我的毛孔和暗沉，让我的皮肤看起来像剥了壳的鸡蛋一样光滑。持久度超级棒，即使我运动出汗，妆容也能保持完好。每次用这款粉底液，朋友都会问我是不是偷偷做了皮肤护理，简直太开心了！😜'
                }
            },
            'mask': {
                'fashion': {
                    'short': '🥰 这款{keyword}太补水了！敷完之后皮肤水水嫩嫩的，像喝饱了水一样。熬夜救星，急救必备！',
                    'medium': '🥰 超爱这款{keyword}！补水效果超级棒，敷完之后皮肤水水嫩嫩的，毛孔都变小了。熬夜后敷一片，第二天皮肤状态超好，急救效果明显！',
                    'long': '🥰 强烈推荐这款{keyword}！它含有丰富的保湿成分，能深层滋润肌肤，敷完之后皮肤变得水水嫩嫩的，像喝饱了水一样。熬夜后敷一片，能快速修复肌肤，让第二天的皮肤状态变得超级好。长期使用能改善肌肤干燥、暗沉等问题，让皮肤更加细腻光滑。这款面膜采用天然植物提取物，温和不刺激，适合各种肌肤类型使用！'
                },
                'professional': {
                    'short': '{keyword}含有多种天然植物提取物，具有良好的保湿和修复效果。质地温和，适合各种肌肤类型使用。',
                    'medium': '{keyword}采用天然植物配方，含有多种营养成分，能深层滋润肌肤，修复受损细胞。质地温和不刺激，适合各种肌肤类型使用。使用后能改善肌肤干燥、暗沉等问题，让皮肤更加细腻光滑。',
                    'long': '{keyword}是一款专业级别的面膜产品。它采用天然植物提取物作为主要成分，含有多种维生素和矿物质，能深层滋润肌肤，修复受损细胞。面膜纸采用高品质的材料，贴合度好，能让精华液充分吸收。使用后能改善肌肤干燥、暗沉、松弛等问题，让皮肤变得更加细腻光滑、有弹性。产品经过严格的安全检测，不含对羟基苯甲酸酯、酒精等刺激性成分，适合敏感肌肤人群使用。无论是日常护理还是紧急修复，都能从中获得满意的效果。'
                },
                'humorous': {
                    'short': '{keyword}太神奇了！敷完之后皮肤像婴儿一样嫩，连我家猫都忍不住蹭我的脸。熬夜救星，谁用谁知道！😻',
                    'medium': '{keyword}简直是我的救命稻草！每次熬夜后敷一片，第二天皮肤状态超好，连我老板都夸我气色好。补水效果超级棒，皮肤水水嫩嫩的，像喝饱了水一样！😻',
                    'long': '{keyword}是我最近的新宠面膜！它的补水效果超级棒，敷完之后皮肤变得水水嫩嫩的，像喝饱了水一样。熬夜后敷一片，能快速修复肌肤，让第二天的皮肤状态变得超级好。长期使用能改善肌肤干燥、暗沉等问题，让皮肤更加细腻光滑。这款面膜的质地温和不刺激，适合各种肌肤类型使用。每次敷完面膜，我都感觉自己的皮肤年轻了几岁，连我家猫都忍不住蹭我的脸！😻'
                }
            }
        };
    }

    async generateCopy() {
        // 验证输入
        if (!this.validateInput()) {
            return;
        }

        // 显示加载状态
        this.showLoading();

        try {
            // 构建请求参数
            const params = this.buildRequestParams();
            let copy = '';

            // 根据选择的AI模型生成文案
            const model = this.aiModelSelect.value;
            if (model === 'template') {
                copy = this.generateFromTemplate(params);
            } else if (model === 'doubao') {
                copy = await this.callDoubaoAPI(params);
            }

            // 显示结果
            this.showResult(copy);
        } catch (error) {
            this.showError(error);
        } finally {
            this.hideLoading();
        }
    }

    validateInput() {
        if (!this.keywordInput.value.trim()) {
            alert('请输入产品关键词');
            return false;
        }

        if (!this.productTypeSelect.value) {
            alert('请选择产品类型');
            return false;
        }

        return true;
    }

    buildRequestParams() {
        const productTypeMap = {
            'lipstick': '口红/唇彩',
            'foundation': '粉底液/气垫',
            'mask': '面膜',
            'skincare': '护肤品',
            'eye-makeup': '眼部彩妆',
            'nail': '美甲产品',
            'other': '美妆产品'
        };

        const styleMap = {
            'fashion': '时尚潮流',
            'professional': '专业测评',
            'humorous': '幽默风趣',
            'elegant': '优雅知性',
            'casual': '轻松休闲'
        };

        const lengthMap = {
            'short': '50-100',
            'medium': '100-200',
            'long': '200-300'
        };

        return {
            keyword: this.keywordInput.value.trim(),
            productType: productTypeMap[this.productTypeSelect.value],
            style: styleMap[this.styleSelect.value],
            length: lengthMap[this.lengthSelect.value]
        };
    }

    generateFromTemplate(params) {
        // 根据参数选择预定义模板
        const productType = this.productTypeSelect.value;
        const style = this.styleSelect.value;
        const length = this.lengthSelect.value;
        const keyword = params.keyword;

        // 获取对应模板
        const typeTemplates = this.templates[productType] || this.templates['other'] || {};
        const styleTemplates = typeTemplates[style] || typeTemplates['fashion'] || {};
        let template = styleTemplates[length] || styleTemplates['medium'];

        // 如果没有对应模板，使用默认模板
        if (!template) {
            template = `✨ 强烈推荐这款${keyword}！它具有出色的效果，适合各种场合使用。质地优良，成分安全，是美妆爱好者们的必备单品！`;
        }

        // 替换模板中的关键词
        return template.replace(/\{keyword\}/g, keyword);
    }

    async callDoubaoAPI(params) {
        // 后端已删除，Doubao API功能暂时不可用
        throw new Error('后端服务已停止，Doubao API功能暂时不可用。请使用预定义模板功能。');
    }

    buildPrompt(params) {
        return `请为以下美妆产品创作一篇推广文案：

产品关键词：${params.keyword}
产品类型：${params.productType}
文案风格：${params.style}
文案长度：${params.length}字

要求：
1. 内容要吸引人，突出产品特点
2. 使用${params.style}的语言风格
3. 适合社交媒体推广（如微信、微博、小红书等）
4. 包含emoji表情，增加趣味性
5. 语言自然流畅，符合年轻人的阅读习惯

请生成文案：`;
    }

    showLoading() {
        this.generateBtn.innerHTML = '<span class="loading"></span> 正在生成...';
        this.generateBtn.disabled = true;
    }

    hideLoading() {
        this.generateBtn.innerHTML = '<i class="fas fa-magic"></i> 生成文案';
        this.generateBtn.disabled = false;
    }

    showResult(copy) {
        this.outputContent.textContent = copy;
        this.outputSection.scrollIntoView({ behavior: 'smooth' });
    }

    showError(error) {
        alert(`生成失败：${error.message}`);
        console.error(error);
    }

    async copyCopy() {
        const text = this.outputContent.textContent;
        if (!text || text.includes('点击“生成文案”按钮开始')) {
            alert('没有可复制的文案');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            // 显示成功提示
            const originalText = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
            this.copyBtn.style.backgroundColor = '#28a745';
            this.copyBtn.style.color = 'white';

            // 恢复原状态
            setTimeout(() => {
                this.copyBtn.innerHTML = originalText;
                this.copyBtn.style.backgroundColor = '';
                this.copyBtn.style.color = '';
            }, 2000);
        } catch (error) {
            alert('复制失败，请手动复制');
            console.error(error);
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new BeautyCopywriter();
});
