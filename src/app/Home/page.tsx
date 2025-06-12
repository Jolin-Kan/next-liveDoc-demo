'use client';

import { useState } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.container}>
      {/* 頂部導航欄 */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button 
            className={styles.menuButton}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1>協作文檔知識庫</h1>
        </div>
        <div className={styles.navRight}>
          <button className={styles.newDocButton}>新建文檔</button>
          <div className={styles.userProfile}>👤</div>
        </div>
      </nav>

      <div className={styles.mainContent}>
        {/* 側邊欄 */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarSection}>
              <h3>最近文檔</h3>
              <ul>
                <li>📄 專案規劃</li>
                <li>📄 會議記錄</li>
                <li>📄 開發文檔</li>
              </ul>
            </div>
            <div className={styles.sidebarSection}>
              <h3>我的收藏</h3>
              <ul>
                <li>⭐ 重要筆記</li>
                <li>⭐ 參考資料</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* 主要內容區域 */}
        <main className={styles.content}>
          <div className={styles.welcomeSection}>
            <h2>歡迎使用協作文檔知識庫</h2>
            <p>在這裡，您可以：</p>
            <ul>
              <li>創建和編輯文檔</li>
              <li>與團隊成員協作</li>
              <li>管理知識庫</li>
              <li>追蹤文檔版本</li>
            </ul>
            <button className={styles.startButton}>開始使用</button>
          </div>
        </main>
      </div>
    </div>
  );
}
