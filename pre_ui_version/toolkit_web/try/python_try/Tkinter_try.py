import tkinter as tk

class VectorDrawApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Vector Draw App")

        self.canvas = tk.Canvas(root, width=800, height=600, bg="white")
        self.canvas.pack(fill=tk.BOTH, expand=True)

        self.start_point = None
        self.end_point = None
        self.arrow = None

        self.canvas.bind("<Button-1>", self.on_click)
        self.canvas.bind("<B1-Motion>", self.on_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)

    def on_click(self, event):
        if self.start_point is None:
            self.start_point = (event.x, event.y)
            self.canvas.create_oval(event.x-3, event.y-3, event.x+3, event.y+3, fill="black")
        elif self.end_point is None:
            self.end_point = (event.x, event.y)
            self.canvas.create_oval(event.x-3, event.y-3, event.x+3, event.y+3, fill="black")
            self.draw_arrow(self.start_point, self.end_point)
        else:
            # Reset to allow new drawing
            self.canvas.delete("all")
            self.start_point = (event.x, event.y)
            self.end_point = None
            self.arrow = None
            self.canvas.create_oval(event.x-3, event.y-3, event.x+3, event.y+3, fill="black")

    def on_drag(self, event):
        if self.start_point is not None and self.end_point is None:
            if self.arrow:
                self.canvas.delete(self.arrow)
            self.arrow = self.canvas.create_line(self.start_point[0], self.start_point[1], event.x, event.y, arrow=tk.LAST, fill="black")

    def on_release(self, event):
        if self.start_point is not None and self.end_point is None:
            self.end_point = (event.x, event.y)
            self.canvas.create_oval(event.x-3, event.y-3, event.x+3, event.y+3, fill="black")
            self.draw_arrow(self.start_point, self.end_point)

    def draw_arrow(self, start, end):
        if self.arrow:
            self.canvas.delete(self.arrow)
        self.arrow = self.canvas.create_line(start[0], start[1], end[0], end[1], arrow=tk.LAST, fill="black")

if __name__ == "__main__":
    root = tk.Tk()
    app = VectorDrawApp(root)
    root.mainloop()