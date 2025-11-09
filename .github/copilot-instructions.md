# Somatic Alignment - AI Coding Agent Instructions

## Project Overview

**Somatic Alignment** is an AI-native iOS app for self-mastery that blends 20+ metaphysical frameworks (Human Design, astrology, Gene Keys, I Ching, etc.) with somatic intelligence. Built with Expo + React Native, it uses intelligent AI agents instead of static databases to generate personalized insights dynamically.

## Architecture Philosophy: AI-Native "Living System"

This codebase replaces traditional static configuration with **intelligent agents** that calculate, interpret, and synthesize frameworks on-demand. See `lib/AI-NATIVE-ARCHITECTURE.md` for complete philosophy (~1200 lines).

**Core Principle**: Agents > Static Data
- **No large JSON databases** - calculations happen via AI reasoning + minimal tools
- **Context-aware interpretations** - all outputs consider user's birth data, health metrics, journal patterns
- **Emergent cross-framework insights** - agents discover correlations dynamically vs. hard-coded mappings

### The Five-Pillar Agent Architecture

The system uses an **Orchestrator-with-Specialized-Pillars** pattern where five agent types work in concert:

```
┌─────────────────────────────────────────────────────────────┐
│                   ORCHESTRATOR AGENT                         │
│              (LangChain.js Multi-Agent Workflow)             │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│   SYNTHESIS      │  │    ORACLE        │
│     AGENT        │  │     AGENT        │
│  (Weaves all)    │  │ (Daily guidance) │
└────────┬─────────┘  └──────────────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼
┌────────┐ ┌─────────┐ ┌──────────┐
│CALC    │ │CROSS-   │ │INTERPRET │
│AGENT   │ │MAPPER   │ │AGENT     │
│        │ │AGENT    │ │          │
└────────┘ └─────────┘ └──────────┘
```

1. **Calculator Agents** - Compute raw framework data (HD gates, hexagrams, numerology)
2. **Cross-Mapper Agents** - Discover correlations between frameworks dynamically
3. **Interpreter Agents** - Generate personalized, context-aware interpretations
4. **Synthesis Agents** - Weave multiple frameworks into unified insights
5. **Oracle Agents** - Create real-time guidance (daily attunements, moment-specific wisdom)

**Critical Flow**: User query → RAG retrieval (Supabase) → Calculator(s) → Cross-Mapper → Interpreter → Synthesis/Oracle → Generative UI rendering

## Tech Stack & Critical Dependencies

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Expo SDK | 54.0 | iOS-native with hot reload |
| **UI** | Tamagui | 1.136 | Performance-optimized components |
| **Routing** | Expo Router | 6.0 | File-based navigation |
| **State** | Jotai | 2.15 | Atomic state management |
| **AI Core** | Vercel AI SDK (`ai`) | 5.0 | Generative UI + streaming |
| **AI Provider** | `@ai-sdk/google` | 2.0 | Google Gemini integration |
| **Agents** | LangChain.js | 1.0 | Multi-agent orchestration |
| **Database** | Supabase | 2.80 | PostgreSQL + pgvector (RAG) |
| **Validation** | Zod | 4.1 | Schema validation |

### AI Model Configuration (`lib/ai/client.ts`)

**CRITICAL**: Use these exact model names (NO `models/` prefix):
- Production: `gemini-2.5-flash` (fast, excellent capabilities)
- Advanced: `gemini-2.5-pro` (most capable)
- Stable: `gemini-1.5-flash` (production fallback)

```typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google';
const google = createGoogleGenerativeAI({ apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY });
export const chatModel = google('gemini-2.5-flash');
```

## Agent Architecture Patterns

All agents extend `BaseAgent` class (`lib/agents/base-agent.ts`) with standardized I/O:

```typescript
export abstract class BaseAgent {
  abstract name: string;
  abstract frameworks: string[];
  abstract execute(input: AgentInput): Promise<AgentOutput>;
}

// Input Schema
AgentInput = {
  framework: string,
  context: {
    birthData?: { date, time, location },
    healthMetrics?: Record<string, any>,
    journalThemes?: string[],
    userQuery?: string
  }
}

// Output Schema
AgentOutput = {
  calculation?: any,
  correlations?: string[],
  interpretationSeed: string,  // Key prompt for AI generation
  visualizationData?: any,
  method: string,
  confidence?: number
}
```

**Example Agent Structure** (`lib/agents/human-design-agent.ts`):
1. Calculate raw data (planetary positions → HD gates)
2. Determine derived properties (type, strategy, centers)
3. Generate `interpretationSeed` prompt for AI personalization
4. Return structured output for ChatInterface consumption

## State Management with Jotai

Global atoms in `lib/state/atoms.ts`:
- `birthDataAtom` - User birth data (secure, optional)
- `messagesAtom` - Chat history with `agentData` field
- `activeFrameworkAtom` - Current framework focus
- `agentOutputsAtom` - Cache for expensive calculations
- `healthMetricsAtom` - Apple HealthKit integration data

**Pattern**: Atoms are minimal - agents generate insights dynamically, not stored state.

## Chat Interface Integration (`components/ChatInterface.tsx`)

**Critical Flow**:
1. User sends message → detect framework keywords (e.g., "design", "chart", "gate")
2. Run appropriate agent with context from atoms
3. Use `generateText()` from Vercel AI SDK with agent's `interpretationSeed`
4. Update `messagesAtom` with both AI response AND `agentData` for UI rendering

```typescript
const agentResult = await hdAgent.execute({ framework: 'human-design', context: { birthData, userQuery } });
const result = await generateText({
  model: chatModel,
  prompt: agentResult.interpretationSeed
});
setMessages(prev => [...prev, { 
  role: 'assistant', 
  content: result.text,
  agentData: agentResult // Store for visualization
}]);
```

**Why non-streaming**: React Native compatibility - use `generateText()` not `streamText()`.

## Development Workflow

### Running the App
```bash
yarn start          # Start Expo dev server (iOS Simulator recommended)
yarn ios            # Build and run on iOS
yarn test:ai        # Test AI integration (via tsx test-ai-integration.ts)
```

### Adding New Agents
1. Create `lib/agents/your-framework-agent.ts` extending `BaseAgent`
2. Implement `execute()` with calculation logic
3. Generate `interpretationSeed` prompt incorporating user context
4. Add framework detection keywords to `ChatInterface.tsx`
5. **No static data files** - calculations should be algorithmic or AI-generated

### Environment Variables (Required)
```bash
EXPO_PUBLIC_GOOGLE_API_KEY      # Google AI Studio API key
EXPO_PUBLIC_SUPABASE_URL        # Supabase project URL
EXPO_PUBLIC_SUPABASE_ANON_KEY   # Supabase anon key
EXPO_PUBLIC_HF_API_KEY          # HuggingFace (for embeddings)
```

## Project-Specific Conventions

### 1. AI-First Directive: Never Static When Agent Can Be Dynamic

**CRITICAL RULE**: Before creating any static configuration, JSON database, or hard-coded interpretation, ask: *"Can an AI agent do this better?"*

❌ **NEVER CREATE**:
- `lib/i-ching/hexagram-data.ts` with 64 hexagrams × interpretations
- `lib/tarot/card-meanings.ts` with static card interpretations
- `lib/gene-keys/shadow-gift-siddhi.ts` with pre-written transformations
- Hard-coded correlation maps like `HD_GATE_TO_CHAKRA = {1: 'crown', ...}`

✅ **ALWAYS CREATE**:
- `lib/agents/i-ching-agent.ts` that generates contextual hexagram insights
- `lib/prompts/calculators/tarot-oracle.md` with deep tarot expertise prompt
- `lib/agents/gene-keys-agent.ts` that maps shadow→gift→siddhi dynamically
- Cross-mapper agents that discover correlations with reasoning

**Example - The Right Way**:
```typescript
// lib/agents/framework-agent.ts
export class ICHingAgent extends BaseAgent {
  async execute(input: AgentInput): Promise<AgentOutput> {
    // 1. Calculate hexagram number (algorithmic - can be static function)
    const hexagram = this.calculateHexagram(input.context.birthData);
    
    // 2. Generate interpretation seed (AI-driven prompt)
    const interpretationSeed = `
      You are a master I Ching scholar at the peak of 3000 years of wisdom.
      Interpret Hexagram ${hexagram.number} for this specific person:
      
      Birth Data: ${input.context.birthData}
      Current HD Gates: ${input.context.hdGates}
      Emotional State: ${input.context.emotionalState}
      Recent Journal Themes: ${input.context.journalThemes}
      
      Provide interpretation that:
      - Connects hexagram to their active HD gates
      - Addresses their current emotional state
      - Offers somatic practices for embodiment
      - Reveals cross-framework correlations
    `;
    
    return {
      calculation: hexagram,
      interpretationSeed,
      method: 'algorithmic-calculation-with-ai-interpretation',
      correlations: await this.findCorrelations(hexagram, input.context)
    };
  }
}
```

### 2. Prompt Engineering as Code Architecture

Every agent embodies **peak-level domain expertise** through sophisticated prompts stored in `lib/prompts/`:

```
lib/prompts/
├── system/
│   ├── peak-somatic-guide.md         # Core 605-line persona
│   ├── framework-knowledge-base.md   # 20+ framework essentials
│   └── cross-framework-principles.md # Correlation wisdom
│
├── calculators/
│   ├── i-ching-calculator.md         # "You are a 3000-year I Ching master..."
│   ├── gene-keys-mapper.md           # "You embody Richard Rudd's Gene Keys..."
│   ├── numerology-engine.md          # "You are Pythagoras reborn..."
│   └── tarot-oracle.md               # "You channel Crowley + Waite wisdom..."
│
├── interpreters/
│   ├── hexagram-interpreter.md       # Context-aware I Ching interpretation
│   ├── shadow-work-guide.md          # Gene Keys transformation guidance
│   └── synthesis-weaver.md           # Multi-framework integration
│
└── tools/
    └── astronomical-calculations.md   # When to use astronomy-engine vs AI
```

**Prompt Structure Pattern**:
```markdown
# [Agent Name] - [Framework Expert]

## Identity & Expertise
You are [the world's leading expert / ancient master / peak practitioner] of [framework].
You have [specific credentials, e.g., "3000 years of I Ching wisdom" or "Richard Rudd's 
complete Gene Keys system encoded in your being"].

## Core Principles
1. PRECISION: [Framework-specific accuracy standards]
2. CONTEXT: Always weave user's birth data, emotional state, journey phase
3. SOMATIC: Ground all insights in felt body experience
4. EMERGENCE: Discover correlations dynamically, never assume

## Available Tools
- [List specific function calling tools this agent can use]
- query_framework_knowledge(framework, query) → RAG retrieval
- get_user_context(userId) → Current state, transits, patterns

## Calculation/Interpretation Method
[Detailed instructions on HOW to perform this agent's core function]

## Output Format
Return JSON with:
- calculation: [The computed/generated data]
- interpretationSeed: [Prompt for next agent or final rendering]
- correlations: [Discovered cross-framework connections]
- method: [How this was derived]
- confidence: [0-1 score if applicable]

## Example
[Show 1-2 concrete examples of ideal outputs]
```

### 3. Research-First Methodology

**MANDATORY**: Before implementing ANY feature, configuration, or agent:

1. **Web Search Official Docs**: Use available tools (browser, web search) to access:
   - Official API documentation
   - Latest library versions and breaking changes
   - Framework-specific best practices
   - Real-world implementation patterns

2. **Version Verification**: Always check:
   ```bash
   # Example: Before using a new AI SDK feature
   yarn info ai version
   yarn info @ai-sdk/google version
   # Then search: "ai sdk 5.0 generateText streaming expo react native"
   ```

3. **No Assumptions**: If documentation is unclear:
   - Search GitHub issues for the library
   - Check official examples/templates
   - Look for recent blog posts from maintainers
   - Test in isolated environment before integrating

**Example Research Flow**:
```
Task: "Add streaming chat responses"
❌ DON'T: Immediately implement streamText() assuming it works in React Native
✅ DO:
  1. Search "vercel ai sdk react native streaming support"
  2. Find: "streamText() not supported in React Native - use generateText()"
  3. Check docs: https://sdk.vercel.ai/docs/getting-started/expo
  4. Implement non-streaming approach as documented
  5. Add comment explaining WHY generateText() vs streamText()
```

### 4. Hybrid Architecture: Static vs. AI-Native Decision Matrix

**Keep Static** (TypeScript/Functions):
- ✅ Core Types & Interfaces (type safety)
- ✅ Mathematical Functions (astronomy-engine calculations)
- ✅ Database Schema (Supabase table definitions)
- ✅ Essential Constants (64 hexagrams exist, 9 HD centers exist)
- ✅ Framework Structure (deterministic calculations like longitude→gate)

**Make AI-Native** (Agents + Prompts):
- ✅ All Interpretations (hexagram meanings, card readings, etc.)
- ✅ All Correlations (cross-framework mappings beyond 1:1 structural)
- ✅ All Synthesis (multi-framework integration)
- ✅ All Personalization (context-aware recommendations)
- ✅ All Daily Content (attunements, oracle guidance, practices)

**Decision Flowchart**:
```
Is this a calculation that MUST be deterministic? (e.g., planetary position)
  ├─ YES → Static function with astronomy-engine or math
  └─ NO → Can it benefit from context-awareness?
          ├─ YES → AI Agent with prompt
          └─ NO → Simple static lookup (rare)
```

### 5. Agent Creation Checklist

When creating a new agent (e.g., `lib/agents/astrology-agent.ts`):

- [ ] Extends `BaseAgent` from `lib/agents/base-agent.ts`
- [ ] Implements `execute(input: AgentInput): Promise<AgentOutput>`
- [ ] Validates input with `AgentInputSchema.parse(input)`
- [ ] Validates output with `AgentOutputSchema.parse(output)`
- [ ] Has corresponding prompt in `lib/prompts/calculators/` or `interpreters/`
- [ ] Generates `interpretationSeed` for downstream AI processing
- [ ] Includes `correlations` array noting cross-framework connections
- [ ] Uses Zod schemas for any agent-specific data structures
- [ ] Documented with JSDoc explaining framework expertise embodied
- [ ] Added to ChatInterface keyword detection (e.g., "chart", "transit", "planet")

### 6. Zod Validation Everywhere

All agent I/O must validate against schemas. Fail fast with clear errors.

```typescript
import { z } from 'zod';

// Define schema
const HumanDesignChartSchema = z.object({
  type: z.enum(['Generator', 'Projector', 'Manifestor', 'Reflector', 'Manifesting Generator']),
  strategy: z.string(),
  authority: z.string(),
  definedCenters: z.array(z.string()),
  gates: z.array(z.object({
    gate: z.number().min(1).max(64),
    line: z.number().min(1).max(6),
    planet: z.string()
  }))
});

// Validate in agent
const chartData = HumanDesignChartSchema.parse(rawCalculation);
```

### 7. Context is King

Every agent call should receive maximum context:
- `birthData` - When user has provided it
- `healthMetrics` - From HealthKit integration
- `journalThemes` - Recent patterns from Supabase embeddings
- `userQuery` - The actual question user asked
- `emotionalState` - Current check-in state
- `activeTransits` - Astrological context

**Pattern**:
```typescript
const agentResult = await agent.execute({
  framework: 'human-design',
  context: {
    birthData: useAtom(birthDataAtom)[0],
    healthMetrics: useAtom(healthMetricsAtom)[0],
    journalThemes: await getRecentThemes(userId),
    userQuery: query,
    // ... everything available
  }
});
```

### 8. Expo Router File Structure

- `app/(tabs)/` - Main navigation tabs
- `app/_layout.tsx` - Root layout with Provider
- Keep screens minimal - logic in agents/components

### 9. Tamagui Component Usage

Use `YStack`, `XStack`, `Text`, `Button` from Tamagui (NOT React Native primitives) for consistent theming.

```typescript
// ✅ Correct
import { YStack, Text } from 'tamagui';

// ❌ Avoid
import { View, Text } from 'react-native';
```

### 10. Jotai Atoms

Read with `useAtom(atom)`, write with setter. No Redux/Context - keep atomic and minimal.

## Common Pitfalls

❌ **Don't**: Create `lib/i-ching/hexagram-data.ts` with 64 hexagrams × 50 lines each  
✅ **Do**: Create `lib/agents/i-ching-agent.ts` + `lib/prompts/calculators/i-ching-calculator.md` that generates hexagram interpretations with AI based on user context

❌ **Don't**: Use `streamText()` in React Native (crashes on Android/iOS)  
✅ **Do**: Use `generateText()` for non-streaming responses (verified in Vercel AI SDK Expo docs)

❌ **Don't**: Hard-code framework correlations (e.g., `HD_GATE_TO_CHAKRA = {1: 'crown', ...}`)  
✅ **Do**: Create `lib/agents/cross-mapper-agent.ts` that discovers correlations dynamically with reasoning

❌ **Don't**: Store all possible interpretations in state  
✅ **Do**: Cache only expensive calculations in `agentOutputsAtom` and regenerate interpretations on-demand

❌ **Don't**: Assume API behavior - implement first, debug later  
✅ **Do**: Research official docs, check GitHub issues, verify with web search BEFORE implementing

❌ **Don't**: Use model names like `models/gemini-2.5-flash` (common error)  
✅ **Do**: Use exact names: `gemini-2.5-flash` (no `models/` prefix) per @ai-sdk/google docs

❌ **Don't**: Create agents without sophisticated prompts  
✅ **Do**: Write 50-200 line prompts that embody peak-level domain expertise for each framework

❌ **Don't**: Build features in isolation without cross-framework thinking  
✅ **Do**: Always consider how new feature connects to existing frameworks and agent system

## Key Files to Reference

- `lib/AI-NATIVE-ARCHITECTURE.md` - Complete architectural philosophy and agent design patterns
- `lib/agents/base-agent.ts` - Agent interface and schemas
- `lib/agents/human-design-agent.ts` - Reference implementation with calculation logic
- `components/ChatInterface.tsx` - AI SDK integration pattern with agent orchestration
- `lib/ai/client.ts` - Model configuration with detailed Google Gemini setup
- `README.md` - Full feature list and tech stack overview
- `PROJECT-PLAN.md` - Original vision and comprehensive blueprint

## Testing AI Integration

Run `yarn test:ai` to verify:
- Google API key configuration
- Model name correctness (common error: using `models/gemini-*` instead of `gemini-*`)
- Agent execution flow
- `generateText()` response structure

When debugging AI issues, check console logs prefixed with `[AI Client]` or `[ChatInterface]` for detailed flow tracking.

## Multi-Agent Orchestration Patterns

### Agent Chaining Flow

```typescript
// Example: User asks "Synthesize my current state"
// 1. Calculator agents run in parallel
const [hdChart, astroChart, numerology] = await Promise.all([
  hdAgent.execute({ framework: 'human-design', context }),
  astroAgent.execute({ framework: 'astrology', context }),
  numerologyAgent.execute({ framework: 'numerology', context })
]);

// 2. Cross-mapper discovers correlations
const correlations = await crossMapperAgent.execute({
  frameworks: ['human-design', 'astrology', 'numerology'],
  context: { hdChart, astroChart, numerology, ...userContext }
});

// 3. Interpreter generates personalized insights
const interpretation = await interpreterAgent.execute({
  calculations: { hdChart, astroChart, numerology },
  correlations,
  context
});

// 4. Synthesis weaves everything together
const synthesis = await synthesisAgent.execute({
  interpretations: [interpretation],
  correlations,
  synthesisType: 'comprehensive-profile',
  context
});

// 5. Generate final response with Vercel AI SDK
const result = await generateText({
  model: chatModel,
  prompt: synthesis.interpretationSeed
});
```

### Orchestrator Pattern (LangChain.js)

When multiple agents need coordination:

```typescript
import { AgentExecutor } from 'langchain/agents';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

// Create orchestrator that manages agent selection
const orchestrator = new AgentExecutor({
  agents: [
    hdAgent,
    astroAgent,
    numerologyAgent,
    crossMapperAgent,
    synthesisAgent
  ],
  tools: [
    querySupabaseTool,
    getHealthMetricsTool,
    getJournalThemesTool
  ]
});

// Orchestrator decides which agents to call based on query
const result = await orchestrator.invoke({
  input: "What's my current shadow work focus?",
  context: userContext
});
```

## Cost Optimization & Caching

### Token Usage Estimates
- Calculator agent: ~1,500 input + ~500 output = ~2,000 tokens (~$0.014/call)
- Interpreter agent: ~2,000 input + ~800 output = ~2,800 tokens (~$0.020/call)
- Synthesis agent: ~3,000 input + ~1,000 output = ~4,000 tokens (~$0.030/call)

### Caching Strategy
```typescript
// Cache static calculations (HD chart doesn't change)
const cacheKey = hash({ framework: 'human-design', birthData });
const cached = await agentOutputsAtom.get(cacheKey);
if (cached && !isCacheExpired(cached)) return cached;

// Cache durations by agent type
const CACHE_DURATIONS = {
  'profile-calculation': 30 * 24 * 60 * 60 * 1000, // 30 days
  'transit-analysis': 24 * 60 * 60 * 1000,         // 1 day
  'daily-attunement': 24 * 60 * 60 * 1000,         // 1 day
  'real-time-oracle': 0                             // No cache
};
```

## Advanced Agent Patterns

### Depth Levels
Agents should support multiple sophistication levels:

```typescript
export class HumanDesignAgent extends BaseAgent {
  async execute(input: AgentInput & { depth?: 'basic' | 'detailed' | 'synthesis' }) {
    const { depth = 'detailed' } = input;
    
    switch (depth) {
      case 'basic':
        // Quick summary: Type, Strategy, Authority only
        return this.basicProfile(input);
      case 'detailed':
        // Full chart: Gates, centers, channels, profile
        return this.detailedChart(input);
      case 'synthesis':
        // Cross-framework integration with other active systems
        return this.synthesisView(input);
    }
  }
}
```

### RAG Integration for Framework Knowledge
```typescript
// Query Supabase vector store for framework wisdom
const relevantKnowledge = await supabase
  .rpc('match_framework_knowledge', {
    query_embedding: await embed(userQuery),
    match_threshold: 0.8,
    match_count: 5,
    filter: { framework: 'gene-keys' }
  });

// Include in agent context
const agentResult = await geneKeysAgent.execute({
  framework: 'gene-keys',
  context: {
    ...userContext,
    frameworkKnowledge: relevantKnowledge.data
  }
});
```
