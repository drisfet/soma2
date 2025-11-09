### Somatic Alignment App: AI-Native Development Plan

#### Key Points
- **Core Vision**: A personal iOS app for self-mastery, blending metaphysical frameworks like Human Design, Jungian psychology, and somatic intelligence into dynamic, AI-driven insights tailored to your biomechanics, energy, and psychology.
- **AI-Native Approach**: Replaces static data with intelligent agents for calculations, interpretations, and syntheses, ensuring adaptability and personalization without hard-coded limitations.
- **Modularity and Scalability**: Built on a Lego-like structure where agents and features interconnect via standardized JSON schemas, allowing easy expansion of frameworks or integrations.
- **Template Foundation**: Gluestack Expo starter provides UI components; Expo MVVM adds architectural modularity; CraftReactNative's Perplexity template incorporates AI hooks for RAG and orchestration—fully compatible for seamless iOS-native performance.
- **AI Frameworks**: Vercel AI SDK drives generative UI and core agent workflows, complemented by LangChain.js for advanced multi-agent chaining, enabling emergent cross-framework insights with minimal costs.
- **User-Centric Design**: Focuses on sovereignty, with privacy via on-device processing where possible, and high-fidelity interactions through an AI chat that queries your data and generates contextual attunements.

#### App Overview
Somatic Alignment is an iOS-native tool designed for high-functioning individuals seeking mastery over their body, mind, and energy. It functions as a "living system" where AI agents dynamically process birth data, health metrics, and journal entries to deliver personalized insights across 20+ frameworks. The app's interface centers on a generative AI chat for interactive queries, daily attunements, and pattern recognition, all grounded in somatic awareness without external hardware.

#### Features and Functionalities
The app offers a suite of interconnected tools for self-reflection and growth:
- **Birth Data Processing**: Secure input of date, time, location with geocoding and timezone validation; agents compute charts (e.g., Human Design gates, astrology transits) on-demand.
- **Psychometric Assessments**: Conversational prompts for MBTI/OEJTS, Enneagram, and Jungian archetypes; agents map cognitive functions to user responses.
- **Somatic and Health Integration**: Passive tracking via Apple HealthKit (e.g., walking asymmetry for posture, camera-based HRV for stress); agents correlate metrics with energy states like polyvagal theory or chakras.
- **Metaphysical Frameworks**: Dynamic calculations for I Ching hexagrams, Gene Keys shadows/gifts, numerology paths, Tarot spreads, Kabbalah Tree of Life, Ayurveda doshas, and more; agents synthesize across systems (e.g., HD gates to chakras).
- **Daily Attunements and Oracle**: AI-generated guidance blending transits, biorhythms, and user context; includes somatic practices like breathwork or movement prompts.
- **Journaling and Pattern Recognition**: Sovereign logs for bodily sensations and emotions; RAG-powered search identifies recurring themes with AI summaries.
- **Shadow and Power Dynamics**: Tools for Machiavellian awareness, Stoic principles, and game theory in relationships; agents highlight manipulation patterns without promoting them.
- **Generative AI Chat**: High-fidelity interface for queries (e.g., "Synthesize my Gate 26 with current transits"); uses generative UI to render dynamic elements like visual mandalas or interactive charts.
- **Cross-Framework Synthesis**: Agents weave insights (e.g., Hero's Journey stages aligned with astrology houses and Enneagram integration paths) for unified profiles.

All features emphasize balance between light (healing) and shadow (protection), with empathetic, trauma-informed language.

#### AI-Native Nature and Structure
The app operates as an ecosystem of agents replacing traditional code:
- **Agents as Core Building Blocks**: Calculator agents handle raw computations (e.g., planetary positions); cross-mappers discover correlations (e.g., Gene Keys to Kabbalah); interpreters provide context-aware insights; synthesizers unify outputs; oracles generate real-time guidance.
- **Prompt-Based Operations**: Agents use Markdown prompts for logic, minimizing hard-coding—e.g., a chakra agent adapts interpretations based on user state.
- **Standardized Inputs/Outputs**: All agents follow JSON schemas (input: {framework, context: {birthData, healthMetrics, journalThemes}}, output: {calculation, correlations, interpretationSeed}) for interoperability; translator agents dynamically convert formats.
- **RAG Integration**: Supabase pgvector stores embeddings of journals and framework knowledge; agents query for relevant snippets during synthesis.
- **Generative UI**: Vercel AI SDK renders dynamic components in the chat (e.g., AI-generated tarot cards or energy flow diagrams based on prompts).
- **Multi-Agent Workflows**: LangChain.js chains agents (e.g., HD calculator → chakra mapper → somatic interpreter), enabling emergent patterns like "Your undefined Root center, under Vata imbalance, suggests dorsal vagal rest."
- **On-Device vs. Cloud**: Executorch for local privacy-sensitive tasks (e.g., basic numerology); cloud for complex syntheses via Gemini/OpenRouter.

This structure ensures the app evolves with AI advancements, adapting insights without code changes.

#### Configurations and Build
- **Tech Stack**: React Native/Expo (SDK 51+) for iOS-native; Gluestack for UI; Jotai for state; Supabase for database/RAG; Vercel AI SDK + LangChain.js for agents; Astronomy-engine for ephemeris; react-native-health for HealthKit.
- **Modularity Directives**: Lego Block organization (/agents/chakra, /prompts/calculators); all agents extend a base class with schema validation; directives like "Prioritize emergence; include somatic grounding in outputs."
- **Scalability Mechanisms**: Cache agent responses in Supabase; parallel chaining for performance; modular packages via Turborepo for adding frameworks.
- **Sophistication Enhancements**: Agents incorporate depth levels (basic/detailed/synthesis); generative UI for interactive visualizations; privacy via end-to-end encryption for birth data.

---

### Comprehensive Somatic Alignment App Blueprint

#### Introduction to the App's Essence
Somatic Alignment emerges as a transformative personal tool in the landscape of self-mastery applications, designed specifically for individuals embodying the "Awakened King" archetype who seek profound integration of biomechanics, energy dynamics, and psychological depths. Unlike conventional journaling or coaching apps that rely on rigid databases and predefined logic, this AI-native system functions as a dynamic, living entity where intelligent agents orchestrate real-time computations, interpretations, and syntheses across an expansive array of metaphysical, psychological, and somatic frameworks. The app's core philosophy draws from embodied cognition principles, treating the user's body as the primary oracle—correlating on-device health metrics with ancient wisdom systems to foster sovereignty without dependency on external devices.

At its heart, the app prioritizes privacy and personalization: All sensitive data (e.g., birth details, journal entries) processes on-device where feasible, with cloud enhancements for complex multi-framework weaves. The interface revolves around a high-fidelity generative AI chat that not only responds to queries but dynamically renders interactive elements, such as visual representations of chakra alignments or Tarot spreads, ensuring an immersive experience tailored to the user's current energetic state. This blueprint synthesizes the app's features, AI-native architecture, modular design, and configurations into a cohesive guide, serving as the single source of truth for development and ensuring high sophistication through emergent AI behaviors.

#### Detailed Features and Functionalities
The app's capabilities are organized into core modules, each powered by AI agents to deliver adaptive, context-aware experiences. These features interlink seamlessly, allowing users to explore their design from multiple angles while maintaining a unified narrative.

1. **Birth Data Input and Validation Module**:
   - Users enter date, time, and location via a secure form; agents automatically geocode addresses (using IP Geolocation APIs) and verify historical timezones/DST for accuracy.
   - Outputs raw data as JSON (e.g., {latitude, longitude, adjustedTime}), feeding into downstream agents without manual intervention.
   - Functionality: Ensures NASA-level precision for all calculations, with error-handling agents suggesting corrections based on common pitfalls.

2. **Psychometric and Personality Assessment Module**:
   - Conversational AI prompts guide users through assessments like OEJTS (Jungian/MBTI), Enneagram (with wings/instincts), and Human Design (centers, gates, profiles).
   - Agents adapt questions dynamically (e.g., based on prior responses) and map results to broader frameworks, such as cognitive functions (Ti/Fe) to archetypes (Hero/Sage).
   - Outputs: Personalized profiles as JSON, with interpretive seeds for synthesis (e.g., "INTJ type aligns with Enneagram 5's introspection under defined Ajna center").

3. **Somatic and Biometric Integration Module**:
   - Leverages Apple HealthKit for passive metrics (steps, HRV via camera PPG, walking asymmetry) to track energy and posture without wearables.
   - Agents correlate data with frameworks like polyvagal theory (ventral/dorsal states) or Reichian armoring, generating alerts (e.g., "Detected asymmetry suggests Root chakra imbalance; recommend grounding practice").
   - Functionality: Real-time somatic prompts, such as breathwork timed to solar noon via Astronomy APIs, enhancing biomechanics awareness.

4. **Metaphysical and Esoteric Frameworks Module**:
   - Encompasses 20+ systems: Human Design (bodygraphs via hdkit agents), Astrology (transits with Swiss Ephemeris), I Ching (hexagram generators), Gene Keys (shadow-to-siddhi paths), Numerology (life path calculations), Tarot (spreads and interpretations), Kabbalah (Tree of Life mappings), Chakra systems (7-9 centers with HD correlations), Ayurveda (dosha balancing), Chinese Medicine (5 elements/meridians), Hermetic principles, Biorhythms, Sacred Geometry, and Mythological narratives (Hero's Journey, Greek/Norse archetypes).
   - Agents compute on-demand (e.g., longitude-to-gate conversions) and provide raw JSON outputs for chaining.
   - Functionality: Users query specific elements (e.g., "Interpret Gate 26 under current Mars transit"), with agents noting cross-mappings like gates ↔ hexagrams ↔ Gene Keys.

5. **Shadow Work and Power Dynamics Module**:
   - Integrates "dark" intelligence: Machiavellian frameworks (48 Laws awareness), Stoicism (principles for resilience), game theory (relationship dynamics), and rhetoric (ethos/pathos/logos).
   - Agents highlight protective patterns (e.g., "Your Enneagram 8 assertiveness guards against manipulation during undefined Solar Plexus waves") without endorsing harm.
   - Functionality: Guided shadow integration sessions, blending with light aspects for balanced sovereignty.

6. **Journaling and Pattern Recognition Module**:
   - Sovereign logs capture sensations, urges, and states; agents embed entries via HuggingFace models in Supabase pgvector for semantic search.
   - Functionality: AI-summarized patterns (e.g., "Recurring stress correlates with Kapha imbalance and dorsal vagal states"), with queryable history in the chat.

7. **Daily Attunements and Oracle Module**:
   - Generates morning/evening insights synthesizing transits, biorhythms, and user data (e.g., "Today's Hexagram 42 advises rest amid your Projector strategy").
   - Oracle agents simulate draws (Tarot, I Ching) with contextual interpretations.
   - Functionality: Custom practices like "Heart-Belly Breath" for somatic release, timed to biological rhythms.

8. **Generative AI Chat Interface**:
   - Central hub for interactions; Vercel AI SDK renders dynamic UI (e.g., interactive mandalas or practice timers based on agent outputs).
   - Supports natural queries with RAG retrieval (e.g., "Synthesize my Saturn return with Enneagram disintegration").
   - Functionality: High-fidelity responses with visuals, ensuring empathetic, trauma-informed dialogue.

#### AI-Native Architecture and Agent System
The app's backbone is a network of agents orchestrated by Vercel AI SDK (for generative UI and streaming) and LangChain.js (for multi-agent workflows), creating a "living system" that adapts without static databases.

- **Agent Types and Workflows**:
  - **Calculator Agents**: Handle precise computations (e.g., biorhythm cycles from birth data) using tools like Astronomy-engine; output JSON for chaining.
  - **Cross-Mapper Agents**: Discover thematic resonances (e.g., astrology houses to Hero's Journey stages) via prompt-based reasoning.
  - **Interpreter Agents**: Provide personalized insights (e.g., "Your Pride shadow in Gene Key 26 feels as chest contraction—titrate with pendulation").
  - **Translator Agents**: Convert formats dynamically (e.g., HD centers to chakra states), ensuring interoperability.
  - **Synthesis and Oracle Agents**: Weave multi-framework outputs into unified attunements, with generative UI rendering results visually.
  - **Chaining Example**: User query → RAG retrieval (Supabase) → Calculator (HD chart) → Mapper (to polyvagal) → Interpreter (somatic advice) → Oracle (practice generation).

- **Prompt Engineering**: Agents use Markdown prompts stored in /prompts (e.g., "Interpret hexagram with somatic grounding, considering user context"); this minimizes code, allowing evolution via text edits.
- **RAG and Data Flow**: Embeddings store framework knowledge and logs; agents query for context (e.g., "Retrieve patterns matching 'energy crash'").
- **Hybrid Processing**: On-device for privacy (Executorch for local models); cloud for depth (Gemini via OpenRouter keys).

This architecture ensures sophistication: Agents enable emergent insights (e.g., unforeseen dosha-polyvagal alignments), with scalability through parallel execution.

#### Modularity, Sophistication, and Scalability
- **Modular Design**: Lego Block via Turborepo packages (/agents/jungian, /prompts/synthesizers); add frameworks by new agent files without refactoring.
- **Sophistication Enhancements**: Depth levels in agents (basic for quick queries, synthesis for deep dives); generative UI for interactive elements; standardized schemas prevent silos.
- **Scalability Mechanisms**: Cache responses in Supabase; async chaining for performance; modular state with Jotai for reactive updates.
- **Overarching Directives**: "Agents must output JSON with keys: calculation, method, correlations; prioritize somatic empathy; use emergence for mappings; integrate HealthKit context."

#### Configurations and Getting Started
- **Stack Summary**: React Native/Expo; Gluestack UI; Jotai state; Supabase pgvector; Vercel AI SDK + LangChain.js; react-native-health; Astronomy-engine.
- **Template Integration Steps**:
  1. Install Gluestack: `npx create-gluestack-app --expo somatic-alignment`.
  2. Overlay Expo MVVM: Clone repo, merge structures (e.g., add viewmodels to /lib/agents).
  3. Add CraftReactNative Perplexity: Integrate hooks (e.g., copy RAG components to /features/chat).
  4. Install AI: `npm i ai langchain @supabase/supabase-js`.
  5. Configure: Set up Supabase keys; define agent base class with schemas.
  6. Build First Agent: Start with HD calculator in /agents/human-design.
  7. Run: `expo start` for iOS testing.

This plan encapsulates the app's vision as a cohesive, AI-native powerhouse for sovereignty.

### Key Citations
- [Starter Kit | React Native UI Kit - gluestack UI](https://gluestack.io/ui/docs/apps/starter-kit)
- [gluestack-ui Starter Kit - GitHub](https://github.com/gluestack/gluestack-ui-starter-kits)
- [Universal React & React Native Component Library - gluestack v3](https://gluestack.io/blogs/gluestack-v3-release)
- [Getting Started: Expo - AI SDK](https://ai-sdk.dev/docs/getting-started/expo)
- [How to Run LLMs on-device in React Native with Vercel AI SDK](https://www.callstack.com/blog/meet-react-native-ai-llms-running-on-mobile-for-real)
- [React Native AI Apps can't get easier (Expo & Vercel AI SDK)](https://www.youtube.com/watch?v=W9bbVJwCyqo)
- [Trace with the Vercel AI SDK (JS/TS only)](https://docs.langchain.com/langsmith/trace-with-vercel-ai-sdk)
- [LangChain - Vercel](https://vercel.com/docs/ai-gateway/framework-integrations/langchain)
