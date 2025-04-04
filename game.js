// 玩家数据
let player = {
    location: 'school',
    affection: 0
};

// 场景数据
const scenes = {
    school: {
        dialogue: '你在学校遇到了碇真嗣，他看起来有点紧张。',
        choices: [
            { text: '打招呼', next: 'greeting' },
            { text: '无视他', next: 'ignore' }
        ]
    },
    greeting: {
        dialogue: '真嗣：你好……有什么我可以帮忙的吗？',
        choices: [
            { text: '聊一会儿', next: 'chat' },
            { text: '离开', next: 'school' }
        ]
    },
    chat: {
        dialogue: '你们聊了一会儿，真嗣逐渐放松下来，露出微笑。',
        effect: () => { player.affection += 10; },
        choices: [
            { text: '继续聊天', next: 'chat_more' },
            { text: '离开', next: 'school' }
        ]
    },
    chat_more: {
        dialogue: '真嗣：和你聊天真的很开心……',
        effect: () => { player.affection += 20; },
        choices: [
            { text: '约他出去', next: 'date' },
            { text: '离开', next: 'school' }
        ]
    },
    date: {
        dialogue: '真嗣脸红了：好……好的，我很期待！',
        effect: () => { player.affection += 30; },
        choices: [
            { text: '返回地图', next: 'school' }
        ]
    },
    ignore: {
        dialogue: '你无视了真嗣，他低头走开了。',
        choices: [
            { text: '返回地图', next: 'school' }
        ]
    },
    nerv: {
        dialogue: '你在NERV总部遇到了绫波丽，她冷冷地看着你。',
        choices: [
            { text: '尝试交谈', next: 'nerv_chat' },
            { text: '离开', next: 'nerv' }
        ]
    },
    nerv_chat: {
        dialogue: '绫波丽：有什么事吗？',
        effect: () => { player.affection += 5; },
        choices: [
            { text: '返回地图', next: 'nerv' }
        ]
    },
    apartment: {
        dialogue: '你在公寓里独自一人，感觉有点安静。',
        choices: [
            { text: '休息一下', next: 'rest' }
        ]
    },
    rest: {
        dialogue: '你休息了一会儿，感觉精力充沛。',
        choices: [
            { text: '返回地图', next: 'apartment' }
        ]
    }
};

// 显示对话
function showDialogue(sceneKey) {
    const scene = scenes[sceneKey];
    document.getElementById('dialogue-text').innerText = scene.dialogue;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => {
            if (scene.effect) scene.effect(); // 执行效果（如增加好感度）
            showDialogue(choice.next); // 显示下一场景
            updateStatus(); // 更新状态栏
        };
        choicesDiv.appendChild(button);
    });
}

// 更新状态栏
function updateStatus() {
    document.getElementById('affection').innerText = player.affection;
    document.getElementById('current-location').innerText = player.location;
}

// 地图点击事件
document.querySelectorAll('.location').forEach(button => {
    button.addEventListener('click', () => {
        player.location = button.dataset.location;
        showDialogue(player.location);
        updateStatus();
    });
});

// 初始化游戏
showDialogue(player.location);
updateStatus();
