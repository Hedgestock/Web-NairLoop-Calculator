export abstract class Pikachu{
  public static Jumpsquat = 3;
  public static UAirAC = 18;
  public static UAirDuration = 26;
  public static UAirWeakHit = 7;
  public static UAirWeakHitlag = 8;
  public static UAirDamage = 6.0;
  public static UAirWeakDamage = 4.0;
  public static FAirDuration = 41;
  public static FAirStartup = 11;
  public static FAirWeakHitlag = 5;
  public static NAirStartup = 3;
  public static NAirDuration = 38;
  public static DairDuration = 47;
  public static DairStartup = 14;
  public static SkullBashStartup = 18;
  public static SkullBashHIT_ENDLAG = 21;
  public static UTiltDamage = 5.0;
  public static DThrowDamage = 5.0;
  public static UAirLandingLagAC = 4;
  public static UAirLandingLag = 14;
  public static FAirLandingLagAC = 4;
  public static FAirLandingLag = 12;
  public static NAirLandingLagAC = 4;
  public static NAirLandingLag = 9;
  public static DairLandingLagAC = 4;
  public static DairLandingLag = 22;
  public static FallSpeed = 1.55;
  public static FastFallSpeed = 2.48;
  public static Waight = 79;
  public static Gravity = 0.095;
  public static FullHop = {
      NO_UAIR: 4,
  
      /*!
       * Returns the Y position in the fullhop trajectory for the given frame.
       *
       * Frame 1 marks the first airborne frame.
       *
       * Because the fullhop trajectory changes when doing a uair, the frame
       * when uair is input must be specified as well. The earliest uair input
       * is frame 1 (stick jump) and a perfect fh uair is frame 2.
       *
       * Set uair to NO_UAIR to get the normal fh trajectory.
       */
      height: (frame: number, uair) => {
        if (uair < 1 || uair >= this.NO_UAIR)
            return data[frame - 1];
    
        // These values were calculated by fitting a 2nd degree polynomial
        // to the section of the fh uair trajectory that was parabolic.
        // The trajectory therefore follows the curve a*x^2 + b*x + c.
        // The fit was done with data starting at x=2,y=(first fh airborne frame)
        const a = -0.0475000018038187;
        const b = 2.527760348696137;
        const c = 1.8706617039999973;
    
        const double yoff = data[uair-1];
        const double xoff = (-b + std::sqrt(b*b - 4*a*(c-yoff))) / (2*a) - uair;
    
        // Frame where pikachu reaches terminal velocity
        const int termFrame = static_cast<int>((-Pikachu::FALL_SPEED - b) / (2*a) - xoff);
        const double termHeight = a*(termFrame+xoff)*(termFrame+xoff) + b*(termFrame+xoff) + c;
    
        // Follow parabola as long as we have not exceeded terminal velocity
        if (frame < termFrame)
            return a*(frame+xoff)*(frame+xoff) + b*(frame+xoff) + c;
    
        // Otherwise follow linear curve
        return termHeight - Pikachu::FALL_SPEED * (frame - termFrame);
    }
  
      static apexFrame() {
          return 22;
      }
  
      static frameCount() {
          return sizeof(data) / sizeof(*data);
      }
  
      static firstFFframe() {
          return 23;
      }
  
  private:
       data[] = {
          6.736181379295886,
          12.235741735436022,
          16.49868214223534,
          19.524999738670886,
          21.219696165062487,
          22.819393278099597,
          24.324091077782214,
          25.733787656761706,
          27.048484922386706,
          28.26818096730858,
          29.392877698875964,
          30.422575117088854,
          31.35727131459862,
          32.19696629140526,
          32.94166386220604,
          33.5913602123037,
          34.14605534169823,
          34.6057530650869,
          34.97044956777245,
          35.24014484975487,
          35.41484272573143,
          35.49453938100487,
          35.47923481557518,
          35.368932844139636,
          35.163629652000964,
          34.86332523915917,
          34.46802342031151,
          33.97772038076073,
          33.39241612050682,
          32.71211445424706,
          31.936811567284167,
          31.06650745961815,
          30.101204038597643,
          29.040901304222643,
          27.88559734914452,
          26.6352940807119,
          25.289991498924792,
          23.849687696434557,
          22.31438458058983,
          20.764385343529284,
          19.214386106468737,
          17.66438686940819,
          16.114387632347643,
          14.56438744161278,
          13.014387250877917,
          11.464387060143054,
          9.91438686940819,
          8.364386678673327,
          6.814386487938464,
          5.2643862972036,
          3.7143863448873162,
          2.164386392571032,
          0.6143864402547479
      };
  };
};


    class Shorthop
    {
    public:
        /*!
         * Returns the Y position in the fullhop trajectory for the given frame.
         * Frame 1 marks the first airborne frame. Frame 0 and less are grounded.
         */
        static height(int frame) {
                return data[frame - 1];
        }

        static apexFrame() {
            return 24;
        }

        static frameCount() {
            return sizeof(data) / sizeof(*data);
        }

        static firstFFframe() {
            return 23;
        }

    private:
         data[] = {
            1.7560520181432366,
            3.4171038875356317,
            4.983155847527087,
            6.454207540489733,
            7.830259443260729,
            9.111311079002917,
            10.297363401390612,
            11.388415456749499,
            12.384467245079577,
            13.285518766380847,
            14.091570020653307,
            14.802621961571276,
            15.418673635460436,
            15.939725042320788,
            16.36577618215233,
            16.696827054955065,
            16.932878614403307,
            17.073930860497057,
            17.119981885887682,
            17.071033597923815,
            16.927085996605456,
            16.68813717458397,
            16.354189039207995,
            15.92524063680321,
            15.401291967369616,
            14.78234398458153,
            14.068395734764636,
            13.259447217918932,
            12.35549843404442,
            11.356550336815417,
            10.262601972557604,
            9.073653341270983,
            7.789704919792712,
            6.410756231285632,
            4.936807752586901,
            3.386807800270617,
            1.8368078479543328,
            0.28680789563804865,
        };
    };

    class Doublejump
    {
    public:
        /*!
         * Returns the Y position in the fullhop trajectory for the given frame.
         * Frame 1 marks the first airborne frame. Frame 0 and less are grounded.
         */
        static height(int frame) {
                return data[frame - 1];
        }

        static apexFrame() {
            return 26;
        }

        static frameCount() {
            return sizeof(data) / sizeof(*data);
        }

        static firstFFframe() {
            return 25;
        }

    private:
         data[] = {
            1.7560520181432366,  // This is actually the first frame of fullhop
            4.305665613152087,
            6.760278821922839,
            9.11989224050194,
            11.384505392052233,
            13.554119230248034,
            15.628732801415026,
            17.608347059227526,
            19.4929600963369,
            21.282573820091784,
            22.977186323143542,
            24.576799512840807,
            26.08141338918358,
            27.49102604482323,
            28.805639387108386,
            30.025251508690417,
            31.149864316917956,
            32.17947590444237,
            33.11408817861229,
            33.95369923207909,
            34.698312879540026,
            35.34792530629784,
            35.902536512352526,
            36.362150312401354,
            36.72676289174706,
            36.996374250389636,
            37.170988203026354,
            37.25060093495995,
            37.23521244619042,
            37.124826551415026,
            36.91943943593651,
            36.61905109975487,
            36.22366535756737,
            35.733278394676745,
            35.147890211082995,
            34.467504621483386,
            33.69211781118065,
            32.82172978017479,
            31.85634243581444,
            30.795955778099597,
            29.640567899681628,
            28.390180707909167,
            27.044794202782214,
            25.604406476952136,
            24.069019437767565,
            22.51902020070702,
            20.96902096364647,
            19.419021726585925,
            17.869022489525378,
            16.31902325246483,
            14.769023061729968,
            13.219022870995104,
            11.669022680260241,
            10.119022489525378,
            8.569022298790514,
            7.019022108055651,
            5.469021917320788,
            3.9190219650045037,
            2.3690220126882195,
            0.8190220603719354
        };
    };

    class Drop
    {
    public:
        /*!
         * Returns the Y position in the platdrop trajectory for the given frame.
         * Frame 1 marks the first actionable frame in the air.
         *
         * When dropping through platforms, 2 frames are spent in the squat
         * animation followed by another 3 frames of transitioning through the
         * platform. The first actionable frame on frame 5.
         */
        static height(int frame) {
                return data[frame - 1];
        }

        static frameCount() {
            return sizeof(data) / sizeof(*data);
        }

    private:
         data[] = {
            0.0,
            -0.5949993133544922,
            -1.2849998474121094,
            -2.0699996948242188,
            -2.9499988555908203,
            -3.924999237060547,
            -4.994998931884766,
            -6.159999847412109,
            -7.420000076293945,
            -8.77500057220459,
            -10.225000381469727,
            -11.770000457763672
        };
    };

    class RunOff
    {
    public:
        /*!
         * Returns the Y position in the runoff trajectory for the given frame.
         * Frame 1 marks the first airborne frame.
         */
        static height(int frame) {
                return data[frame - 1];
        }

        static frameCount() {
            return sizeof(data) / sizeof(*data);
        }

    private:
         data[] = {
            -0.09499931335449219,
            -0.2849998474121094,
            -0.5699996948242188,
            -0.9499988555908203,
            -1.4249992370605469,
            -1.9949989318847656,
            -2.6599979400634766,
            -3.4199981689453125,
            -4.274997711181641,
            -5.224998474121094,
            -6.269998550415039,
            -7.409997940063477,
            -8.644998550415039,
            -9.974998474121094,
            -11.399998664855957,
            -12.919999122619629
        };
    };
};
