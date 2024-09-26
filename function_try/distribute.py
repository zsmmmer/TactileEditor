import tkinter as tk
from tkinter import Canvas

def split_rectangle(rect, rows, cols):
    x1, y1, x2, y2 = rect
    width = (x2 - x1) / cols
    height = (y2 - y1) / rows
    
    rectangles = []
    
    for i in range(cols):
        for j in range(rows):
            new_rect = (
                x1 + i * width, y1 + j * height,
                x1 + (i + 1) * width, y1 + (j + 1) * height
            )
            rectangles.append(new_rect)
    
    return rectangles

def draw_rectangles(rectangles):
    for rect in rectangles:
        canvas.create_rectangle(*rect, outline='blue')

def on_button_click():
    global current_rect
    if current_rect:
        rectangles = split_rectangle(current_rect, 5, 5)
        draw_rectangles(rectangles)

def start_draw(event):
    global start_x, start_y
    start_x, start_y = event.x, event.y

def on_drag(event):
    global current_rect_id, current_rect
    canvas.delete(current_rect_id)
    current_rect = (start_x, start_y, event.x, event.y)
    current_rect_id = canvas.create_rectangle(*current_rect, outline='red')

root = tk.Tk()
root.title("Rectangle Drawer and Splitter")

canvas = Canvas(root, width=500, height=500)
canvas.pack()

start_x = start_y = 0
current_rect = None
current_rect_id = None

canvas.bind("<Button-1>", start_draw)
canvas.bind("<B1-Motion>", on_drag)

split_button = tk.Button(root, text="Split Rectangle", command=on_button_click)
split_button.pack()

root.mainloop()