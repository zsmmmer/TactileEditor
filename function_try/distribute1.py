import tkinter as tk
from shapely.geometry import Polygon, MultiPolygon
import matplotlib.pyplot as plt
from shapely.geometry import box

# 初始化多边形绘制相关变量
polygon_points = []
polygon_complete = False
snap_distance = 15  # 吸附距离

# 初始化Tkinter窗口
root = tk.Tk()
root.title("Polygon Drawer with Snap, Fill, and Splitter")
canvas = tk.Canvas(root, width=500, height=500, bg="white")
canvas.pack()

def split_polygon(polygon, rows, cols):
    minx, miny, maxx, maxy = polygon.bounds
    width = (maxx - minx) / cols
    height = (maxy - miny) / rows
    
    split_polygons = []
    
    for i in range(cols):
        for j in range(rows):
            split_poly = box(minx + i * width, miny + j * height,
                             minx + (i + 1) * width, miny + (j + 1) * height)
            intersected = polygon.intersection(split_poly)
            if not intersected.is_empty:
                split_polygons.append(intersected)
    
    return MultiPolygon(split_polygons)

def on_button_click():
    global polygon_complete
    if polygon_complete:
        polygon = Polygon(polygon_points)
        if not polygon.is_valid:
            print("Invalid polygon!")
            return
        
        split_polygons = split_polygon(polygon, 5, 5)
        
        # 绘制分割后的多边形
        fig, ax = plt.subplots()

        if isinstance(split_polygons, Polygon):
            polys = [split_polygons]
        elif isinstance(split_polygons, MultiPolygon):
            polys = list(split_polygons)
        else:
            polys = []

        for poly in polys:
            x, y = poly.exterior.xy
            ax.fill(x, y, alpha=0.5, fc='blue', ec='black')

        plt.show()

def start_draw(event):
    global polygon_complete
    if not polygon_complete:
        x, y = event.x, event.y
        
        # 检查是否靠近第一个顶点
        if len(polygon_points) > 0:
            x0, y0 = polygon_points[0]
            if abs(x - x0) < snap_distance and abs(y - y0) < snap_distance:
                x, y = x0, y0
                complete_polygon(None)
                return
        
        polygon_points.append((x, y))
        canvas.create_oval(x-3, y-3, x+3, y+3, fill="black")  # 强化顶点
        if len(polygon_points) > 1:
            canvas.create_line(polygon_points[-2][0], polygon_points[-2][1],
                               polygon_points[-1][0], polygon_points[-1][1], fill='red')

def complete_polygon(event):
    global polygon_complete
    if not polygon_complete and len(polygon_points) > 2:
        # 闭合多边形
        canvas.create_line(polygon_points[-1][0], polygon_points[-1][1],
                           polygon_points[0][0], polygon_points[0][1], fill='red')
        # 填充多边形颜色
        canvas.create_polygon(polygon_points, outline='black', fill='lightblue')
        polygon_complete = True

# 绑定鼠标事件
canvas.bind("<Button-1>", start_draw)

# 添加按钮
split_button = tk.Button(root, text="Split Polygon", command=on_button_click)
split_button.pack()

root.mainloop()