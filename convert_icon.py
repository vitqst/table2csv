import cairosvg
import os

def convert_svg_to_png(svg_path, output_dir, sizes):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for size in sizes:
        output_path = os.path.join(output_dir, f"icon{size}.png")
        cairosvg.svg2png(url=svg_path, write_to=output_path, output_width=size, output_height=size)
        print(f"Generated {output_path}")

if __name__ == "__main__":
    svg_file = "icons/icon.svg"
    output_directory = "icons"
    icon_sizes = [16, 48, 128]
    convert_svg_to_png(svg_file, output_directory, icon_sizes)
