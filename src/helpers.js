const DAY_IN_MS = 24 * 60 * 60 * 1000;

const normalizeDate = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const loveStartDate = new Date(2026, 3, 14);

export const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

export const addYears = (date, years) => {
  const nextDate = new Date(date);
  nextDate.setFullYear(nextDate.getFullYear() + years);
  return nextDate;
};

export const diffInDays = (laterDate, earlierDate) =>
  Math.round(
    (normalizeDate(laterDate) - normalizeDate(earlierDate)) / DAY_IN_MS,
  );

export const formatDate = (date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

export const generateDayMilestones = (startDate, maxCount = 10) => {
  const milestones = [];
  for (let i = 1; i <= maxCount; i++) {
    milestones.push({
      label: `Kỷ niệm ${i * 100} ngày`,
      date: addDays(startDate, i * 100),
    });
  }
  return milestones;
};

export const generateYearMilestones = (startDate, maxCount = 10) => {
  const milestones = [];
  for (let i = 1; i <= maxCount; i++) {
    milestones.push({
      label: `Kỷ niệm ${i} năm`,
      date: addYears(startDate, i),
    });
  }
  return milestones;
};

export const getNextBirthday = (mmdd) => {
  const today = new Date();
  const todayStart = normalizeDate(today);
  const thisYear = today.getFullYear();
  const [month, day] = mmdd.split("-").map(Number);
  let birthday = new Date(thisYear, month - 1, day);
  if (birthday < todayStart) {
    birthday = new Date(thisYear + 1, month - 1, day);
  }
  return {
    label: "Sinh nhật Anh Loan",
    date: birthday,
  };
};

export const getSpecialDayMessage = () => {
  const today = new Date();
  const todayFormat = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const specialDays = {
    "10-04":
      "🎉 Chúc mừng sinh nhật Anh Loan! Chúc em bé của anh tuổi mới luôn xinh đẹp, hạnh phúc, thành công trên mọi dự định của em và iu anh nhiều hơn nhé 🎉",
    "03-08":
      "🌸 Chúc mừng ngày Quốc tế Phụ nữ 8/3! Chúc Loan Bộp luôn toả sáng rực rỡ, mãi là doping của anh nhéeee 🌸",
    "10-20":
      "👩 Chúc mừng ngày Phụ nữ Việt Nam 20/10! Chúc Anh Loan luôn vui vẻ, hạnh phúc bên anh thật lâu nha 👩",
  };
  return specialDays[todayFormat] || null;
};
