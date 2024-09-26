import tkinter as tk
from shapely.geometry import LineString, Point

# 主应用类
class LineDrawerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("拖拽绘制直线")
        
        self.canvas = tk.Canvas(root, width=600, height=400, bg="white")
        self.canvas.pack()
        
        self.lines = []  # 用于存储每条直线的起点和终点
        self.buffers = []  # 用于存储每条直线的缓冲区
        self.intersected_lines = []  # 存储相交的直线索引
        self.current_line = None
        
        self.canvas.bind("<Button-1>", self.on_click)

    def on_click(self, event):
        if self.current_line is None:
            # 记录直线的起点
            self.current_line = [(event.x, event.y)]
            self.canvas.create_oval(event.x-3, event.y-3, event.x+3, event.y+3, fill="black")  # 绘制起点圆点
        else:
            # 记录直线的终点并完成直线的绘制
            self.current_line.append((event.x, event.y))
            self.draw_line(self.current_line)
            self.finalize_line(self.current_line)
            self.current_line = None

    def draw_line(self, line):
        # 绘制直线并绘制终点圆点
        x0, y0 = line[0]
        x1, y1 = line[1]
        line_id = self.canvas.create_line(x0, y0, x1, y1, fill="blue", width=2)
        self.canvas.create_oval(x1-3, y1-3, x1+3, y1+3, fill="black")  # 绘制终点圆点
        self.lines.append((line_id, line))

    def finalize_line(self, line):
        current_line_geom = LineString(line)
        current_buffer = current_line_geom.buffer(5)
        
        for i, (_, prev_line) in enumerate(self.lines[:-1]):
            prev_buffer = LineString(prev_line).buffer(5)
            if current_buffer.intersects(prev_buffer):
                self.intersected_lines.append(i)
                self.intersected_lines.append(len(self.lines) - 1)
        
        self.buffers.append(current_buffer)
        self.update_line_colors()

    def update_line_colors(self):
        # 更新所有直线的颜色
        for i, (line_id, _) in enumerate(self.lines):
            color = "red" if i in self.intersected_lines else "blue"
            self.canvas.itemconfig(line_id, fill=color)

# 创建并运行应用程序
root = tk.Tk()
app = LineDrawerApp(root)
root.mainloop()