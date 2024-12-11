// vite.config.js
import { defineConfig } from "file:///C:/Users/gabri/Desktop/Projects/ggb-theme/node_modules/vite/dist/node/index.js";
import ts from "file:///C:/Users/gabri/Desktop/Projects/ggb-theme/node_modules/vite-plugin-ts/index.js";
import tailwindcss from "file:///C:/Users/gabri/Desktop/Projects/ggb-theme/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/gabri/Desktop/Projects/ggb-theme/node_modules/autoprefixer/lib/autoprefixer.js";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  plugins: [ts()],
  build: {
    outDir: "./assets",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: "./src/main.ts",
        nav: "./src/nav.ts",
        "category-picker": "./src/category-picker.ts",
        "collections-slider": "./src/collections-slider.ts",
        swiper: "./src/swiper.ts",
        faqs: "./src/faqs.ts",
        collection: "./src/collection.ts",
        product: "./src/product.ts",
        "collection-filters": "./src/collection-filters.ts",
        cart: "./src/cart.ts",
        supabase: "./src/supabase.ts",
        filters: "./src/filters.ts"
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnYWJyaVxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXGdnYi10aGVtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ2FicmlcXFxcRGVza3RvcFxcXFxQcm9qZWN0c1xcXFxnZ2ItdGhlbWVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2dhYnJpL0Rlc2t0b3AvUHJvamVjdHMvZ2diLXRoZW1lL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB0cyBmcm9tICd2aXRlLXBsdWdpbi10cyc7XHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XHJcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgY3NzOiB7XHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpLCBhdXRvcHJlZml4ZXIoKV0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3RzKCldLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICcuL2Fzc2V0cycsXHJcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgbWFpbjogJy4vc3JjL21haW4udHMnLFxyXG4gICAgICAgIG5hdjogJy4vc3JjL25hdi50cycsXHJcbiAgICAgICAgJ2NhdGVnb3J5LXBpY2tlcic6ICcuL3NyYy9jYXRlZ29yeS1waWNrZXIudHMnLFxyXG4gICAgICAgICdjb2xsZWN0aW9ucy1zbGlkZXInOiAnLi9zcmMvY29sbGVjdGlvbnMtc2xpZGVyLnRzJyxcclxuICAgICAgICBzd2lwZXI6ICcuL3NyYy9zd2lwZXIudHMnLFxyXG4gICAgICAgIGZhcXM6ICcuL3NyYy9mYXFzLnRzJyxcclxuICAgICAgICBjb2xsZWN0aW9uOiAnLi9zcmMvY29sbGVjdGlvbi50cycsXHJcbiAgICAgICAgcHJvZHVjdDogJy4vc3JjL3Byb2R1Y3QudHMnLFxyXG4gICAgICAgICdjb2xsZWN0aW9uLWZpbHRlcnMnOiAnLi9zcmMvY29sbGVjdGlvbi1maWx0ZXJzLnRzJyxcclxuICAgICAgICBjYXJ0OiAnLi9zcmMvY2FydC50cycsXHJcbiAgICAgICAgc3VwYWJhc2U6ICcuL3NyYy9zdXBhYmFzZS50cycsXHJcbiAgICAgICAgZmlsdGVyczogJy4vc3JjL2ZpbHRlcnMudHMnLFxyXG4gICAgICB9LFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdbbmFtZV0uanMnLFxyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW25hbWVdLltleHRdJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVQsU0FBUyxvQkFBb0I7QUFDdFYsT0FBTyxRQUFRO0FBQ2YsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxrQkFBa0I7QUFFekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNkLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLEtBQUs7QUFBQSxRQUNMLG1CQUFtQjtBQUFBLFFBQ25CLHNCQUFzQjtBQUFBLFFBQ3RCLFFBQVE7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLFNBQVM7QUFBQSxRQUNULHNCQUFzQjtBQUFBLFFBQ3RCLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
