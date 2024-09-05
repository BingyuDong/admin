const option1 = {
  fpsLimit: 60,
  fullScreen: { enable: true },
  particles: {
    number: {
      value: 50
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 400,
      random: {
        enable: true,
        minimumValue: 200
      }
    },
    move: {
      enable: true,
      speed: 10,
      direction: "top",
      outModes: {
        default: "out",
        top: "destroy",
        bottom: "none"
      }
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      resize: true
    }
  },
  detectRetina: true,
  themes: [
    {
      name: "light",
      default: {
        value: true,
        mode: "light"
      },
      options: {
        background: {
          color: "#f7f8ef"
        },
        particles: {
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
          }
        }
      }
    },
    {
      name: "dark",
      default: {
        value: true,
        mode: "dark"
      },
      options: {
        background: {
          color: "#080710"
        },
        particles: {
          color: {
            value: ["#004f74", "#5f5800", "#245100", "#7d0000", "#810c00"]
          }
        }
      }
    }
  ],
  emitters: {
    direction: "top",
    position: {
      x: 50,
      y: 150
    },
    rate: {
      delay: 0.2,
      quantity: 2
    },
    size: {
      width: 100,
      height: 0
    }
  }
}

const option2 = {
  fpsLimit: 60,
  fullScreen: { enable: true },
  particles: {
    number: {
      value: 50
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 400,
      random: {
        enable: true,
        minimumValue: 200
      }
    },
    move: {
      enable: true,
      speed: 10,
      direction: "top",
      outModes: {
        default: "out",
        top: "destroy",
        bottom: "none"
      }
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      resize: true
    }
  },
  style: {
    filter: "blur(50px)"
  },
  detectRetina: true,
  themes: [
    {
      name: "light",
      default: {
        value: true,
        mode: "light"
      },
      options: {
        background: {
          color: "#f7f8ef"
        },
        particles: {
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
          }
        }
      }
    },
    {
      name: "dark",
      default: {
        value: true,
        mode: "dark"
      },
      options: {
        background: {
          color: "#080710"
        },
        particles: {
          color: {
            value: ["#004f74", "#5f5800", "#245100", "#7d0000", "#810c00"]
          }
        }
      }
    }
  ],
  emitters: {
    direction: "top",
    position: {
      x: 50,
      y: 150
    },
    rate: {
      delay: 0.2,
      quantity: 2
    },
    size: {
      width: 100,
      height: 0
    }
  }
}

const option3 = {
  background: {
    color: {
      value: '#0d47a1'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        // mode: 'repulse'
        mode: 'grab'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#fff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 },
    }
  },
  detectRetina: true
}
export const options = [option1, option2, option3]