package com.example.logomania.Entity;

public class Word {
    private int id;
    private String name;
    private String audio;
    private String image;
    private String phoneme;
    private int position;

    public Word(){
    }

    public Word(int id, String name, String audio, String image, String phoneme, int position) {
        this.id = id;
        this.name = name;
        this.audio = audio;
        this.image = image;
        this.phoneme = phoneme;
        this.position = position;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAudio() {
        return audio;
    }

    public String getImage() {
        return image;
    }

    public String getPhoneme() {
        return phoneme;
    }

    public int getPosition() {
        return position;
    }
}

