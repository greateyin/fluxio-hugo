#!/usr/bin/env python3
"""
批量修復被破壞的 2025-11-18 文章
檢查並修復標題和描述問題
"""

import os
import glob
import re

def check_and_fix_article(filepath):
    """檢查並修復文章內容"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 檢查是否有從檔名生成的無意義標題
        if 'title: 2025 11 18' in content or 'title: 2025-11-18' in content:
            print(f"⚠️  發現破壞的文章: {filepath}")
            
            # 嘗試從檔名推斷有意義的標題
            filename = os.path.basename(filepath)
            # 移除日期前綴和副檔名
            clean_name = filename.replace('2025-11-18-', '').replace('.md', '')
            
            # 轉換為可讀的標題
            words = clean_name.split('-')
            title = ' '.join(word.capitalize() for word in words)
            
            # 修復標題和描述
            content = re.sub(
                r'title: .*',
                f'title: {title}',
                content
            )
            
            content = re.sub(
                r'description: .*',
                f'description: 深度分析 {title} 的最新發展與影響。',
                content
            )
            
            # 確保日期正確
            content = re.sub(
                r'date: 2025-11-18',
                'date: 2024-11-18',
                content
            )
            
            # 寫回文件
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ 已修復: {filepath}")
            return True
        else:
            print(f"✓ 正常: {filepath}")
            return False
            
    except Exception as e:
        print(f"❌ 處理失敗 {filepath}: {e}")
        return False

def main():
    """主函數"""
    # 找到所有 2025-11-18 的文章
    patterns = [
        "./content/posts/AINews/2025-11-18-*.md",
        "./2025-11-18-*.md"
    ]
    
    all_files = []
    for pattern in patterns:
        files = glob.glob(pattern)
        all_files.extend(files)
    
    print(f"找到 {len(all_files)} 個 2025-11-18 文章需要檢查")
    
    fixed_count = 0
    for filepath in all_files:
        if check_and_fix_article(filepath):
            fixed_count += 1
    
    print(f"\n✅ 完成! 共修復了 {fixed_count} 個文件")

if __name__ == "__main__":
    main()