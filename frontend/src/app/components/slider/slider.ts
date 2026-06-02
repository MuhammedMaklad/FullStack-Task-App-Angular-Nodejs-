import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'],
})
export class Slider implements OnInit, OnDestroy {
  slides = [
    {
      url: 'image1.png',
      title: 'Organize Your Life',
      description: 'The simple way to stay on top of your daily tasks.',
    },
    {
      url: 'image2.png',
      title: 'Boost Productivity',
      description: 'Smart features to help you get more done in less time.',
    },
    {
      url: 'image3.png',
      title: 'Track Progress',
      description: 'Visualize your achievements and stay motivated.',
    },
    {
      url: 'image4.png',
      title: 'Collaborate Easily',
      description: 'Share tasks and projects with your team effortlessly.',
    },
    {
      url: 'image5.png',
      title: 'Secure & Reliable',
      description: 'Your data is safe with our advanced security protocols.',
    },
  ];

  currentIndex = signal(0);
  sliderInterval: any;
  isPlaying = signal(false);

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  previousSlide(): void {
    const prev = (this.currentIndex() - 1 + this.slides.length) % this.slides.length;
    this.currentIndex.set(prev);
  }

  nextSlide(): void {
    const next = (this.currentIndex() + 1) % this.slides.length;
    this.currentIndex.set(next);
  }

  setIndex(index: number): void {
    this.currentIndex.set(index);
  }

  startSlider(): void {
    if (this.isPlaying()) return;
    this.isPlaying.set(true);
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopSlider(): void {
    this.isPlaying.set(false);
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  onMouseEnter(): void {
    this.stopSlider();
  }

  onMouseLeave(): void {
    this.startSlider();
  }
}
