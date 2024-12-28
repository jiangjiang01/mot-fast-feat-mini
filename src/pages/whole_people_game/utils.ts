// 返回上一页，失败则跳转到首页
export const onBack = () => {
  uni.navigateBack({
    delta: 1,
    fail() {
      uni.switchTab({
        url: '/pages/home/home',
      });
    },
  });
};

// 跳转到比赛报名页
export const onGotoGameRegister = () => {
  uni.navigateTo({
    url: '/pages/whole_people_game/game_register/index',
  });
};

// 跳转到积分明细页
export const onGotoIntegralDetail = () => {
  uni.navigateTo({
    url: '/pages/whole_people_game/integral_detail/index',
  });
};

// 跳转到积分攻略页
export const onGotoIntegralSkill = () => {
  uni.navigateTo({
    url: '/pages/whole_people_game/integral_skill/index',
  });
};
