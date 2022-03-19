const setData = (e) => {
    const xpTarget = document.querySelector('#xp-target');
    const levelTarget = document.querySelector('#level-target');
    const streakTarget = document.querySelector('#streak-target');

    axios.get(`/api/user/${e.target.value}`)
        .then(res => {
            if (!res.data || !res.data.user) {
                return;
            }
            const { xp, level, streak } = res.data.user;
            if (xpTarget) {
                xpTarget.innerText = xp;
            }
            if (levelTarget) {
                levelTarget.innerText = level;
            }
            if (streakTarget) {
                streakTarget.innerText = streak;
            }
        })
        .catch(console.error);
}