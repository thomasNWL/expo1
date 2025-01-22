// 导入expo-router中的Link组件，用于在应用内进行导航
import { Link } from 'expo-router';
// 导入expo-web-browser模块，用于在应用内打开网页
import * as WebBrowser from 'expo-web-browser';
// 导入React库，用于创建组件
import React from 'react';
// 导入react-native中的Platform模块，用于判断当前平台是web还是native
import { Platform } from 'react-native';

// 导出一个名为ExternalLink的函数组件
export function ExternalLink(
  // 组件的props类型，使用Omit来排除Link组件的href属性，并添加自定义的href属性
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }
) {
  return (
    // 使用Link组件进行导航
    <Link
      // 设置Link的目标为在新标签页中打开
      target="_blank"
      // 将传入的props展开到Link组件中
      {...props}
      // @ts-expect-error: External URLs are not typed.
      // 注释：告诉TypeScript忽略这一行的类型检查，因为外部URL没有类型定义
      href={props.href}
      // 设置Link的点击事件处理函数
      onPress={(e) => {
        // 判断当前平台是否不是web
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(props.href as string);
        }
      }}
    />
  );
}
