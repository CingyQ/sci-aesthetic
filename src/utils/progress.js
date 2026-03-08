// 学习进度 localStorage 管理

const STORAGE_KEY = 'sci-aesthetic-progress';

// 获取全部进度
export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// 标记页面已完成
export function markCompleted(pageId) {
  const progress = getProgress();
  progress[pageId] = { completed: true, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// 检查页面是否完成
export function isCompleted(pageId) {
  const progress = getProgress();
  return !!progress[pageId]?.completed;
}

// 获取模块完成百分比
export function getModuleProgress(modulePrefix, totalPages) {
  const progress = getProgress();
  let completed = 0;
  for (let i = 1; i <= totalPages; i++) {
    const pageId = `${modulePrefix}-p${i}`;
    if (progress[pageId]?.completed) {
      completed++;
    }
  }
  return Math.round((completed / totalPages) * 100);
}

// 重置进度
export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
