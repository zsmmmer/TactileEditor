from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import cairo
import io

def generate_svg(request):
    WIDTH, HEIGHT = 800, 600

    # 创建一个内存中的 SVGSurface
    svg_io = io.BytesIO()
    surface = cairo.SVGSurface(svg_io, WIDTH, HEIGHT)
    context = cairo.Context(surface)

    # 设置线条宽度和颜色
    context.set_line_width(2)
    context.set_source_rgb(0, 0, 0)

    # 示例绘制：绘制一条从 (100, 100) 到 (400, 300) 的线
    context.move_to(100, 100)
    context.line_to(400, 300)
    context.stroke()

    # 完成绘制
    surface.finish()

    # 获取 SVG 数据
    svg_data = svg_io.getvalue().decode('utf-8')

    return JsonResponse({'svg': svg_data})