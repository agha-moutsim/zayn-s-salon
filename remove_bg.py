from PIL import Image

def remove_black_background(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Tolerance for "black"
    for item in datas:
        # if r < 20, g < 20, b < 20, make it transparent
        if item[0] < 20 and item[1] < 20 and item[2] < 20:
            # Fully transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_black_background("c:/Users/Agha Moutsim/Desktop/zayn-hair/public/images/main-logo.png", "c:/Users/Agha Moutsim/Desktop/zayn-hair/public/images/main-logo-transparent.png")
