def make_final_video(number_of_clips):
    print_step("Creating the final video 🎥")
    VideoFileClip.reW = lambda clip: clip.resize(width=W)
    VideoFileClip.reH = lambda clip: clip.resize(width=H)

    background_clip = (
        VideoFileClip("assets/mp4/clip.mp4")
        .without_audio()
        .resize(height=H)
        .crop(x1=1166.6, y1=0, x2=2246.6, y2=1920)
    )
    # Gather all audio clips
    audio_clips = []
    for i in range(0, number_of_clips):
        audio_clips.append(AudioFileClip(f"assets/mp3/{i}.mp3"))
    audio_clips.insert(0, AudioFileClip(f"assets/mp3/title.mp3"))
    audio_concat = concatenate_audioclips(audio_clips)
    audio_composite = CompositeAudioClip([audio_concat])

    # Gather all images
    image_clips = []
    for i in range(0, number_of_clips):
        #get text from txt file
        with open(f"assets/txt/{i}.txt", "r") as f:
            text = f.read()
        image_clips.append(
            TextClip(
                text,
                font="assets/fonts/Roboto-Regular.ttf",
                color="white",
                method="caption",
                size=(W-100, H-1800),
                stroke_width=2,
                stroke_color="white",
                bg_color=(0, 0, 0, 0.36),
            )
            .set_duration(audio_clips[i + 1].duration)
            .set_position("center")
            .resize(width=W - 100),
        )
    with open(f"assets/txt/title.txt", "r") as f:
        text = f.read()
    image_clips.insert(
        0,
        TextClip(
                text,
                font="assets/fonts/Roboto-Regular.ttf",
                color="orange",
                method="label",
                size=(W, H),
                stroke_width=2,
                stroke_color="orange",
            )
        .set_duration(audio_clips[0].duration)
        .set_position("center")
        .resize(width=W - 100),
    )
    image_concat = concatenate_videoclips(image_clips).set_position(
        ("center", 300)
    )
    image_concat.audio = audio_composite
    final = CompositeVideoClip([background_clip, image_concat])
    final.write_videofile(
        "assets/final_video.mp4", fps=30, audio_codec="aac", audio_bitrate="192k"
    )

    for i in range(0, number_of_clips):
        pass