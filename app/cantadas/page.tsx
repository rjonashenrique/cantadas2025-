"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Copy, Star, BookOpen, Smile } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/lib/favorites-context"
import { useState, useMemo } from "react"

const allPickupLines = [
  {
    id: 1,
    text: "Você deve ser uma bênção, porque desde que te vi, minha vida mudou para melhor.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 2,
    text: "Se Deus criou algo mais belo que você, deve ter guardado só para Ele no céu.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    text: "Você é a resposta para todas as minhas orações... literalmente!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 4,
    text: "Deus deve ter usado todo o Seu amor quando te criou.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 5,
    text: "Você é como Provérbios 31: uma mulher virtuosa cujo valor excede o de rubis.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 6,
    text: "Se eu fosse Josué, pediria ao sol para parar só para ter mais tempo contigo.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 7,
    text: "Você deve ser um anjo, porque trouxe o céu para a minha vida.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 8,
    text: "Deus realmente se superou quando te criou... e olha que Ele já tinha feito o pôr do sol!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 9,
    text: "Você é como a fé: não posso ver, mas sei que é real e transforma tudo.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 10,
    text: "Se o amor é paciente e bondoso, então você deve ser a definição perfeita do amor.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 11,
    text: "Você é como o fruto do Espírito: amor, alegria, paz... tudo em uma pessoa só.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 12,
    text: "Se eu pudesse reescrever o Gênesis, começaria com 'No princípio, Deus criou você'.",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 13,
    text: "Você é como a prova de que Deus tem um senso de humor perfeito e um coração cheio de amor.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 14,
    text: "Como Rute seguiu Noemi, eu seguiria você até o fim do mundo.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 15,
    text: "Você é como um salmo: cada palavra sua traz paz ao meu coração.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 16,
    text: "Se Deus pintou o arco-íris, imagino que cores Ele usou para pintar seus olhos.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 17,
    text: "Você deve ser uma parábola, porque cada momento contigo ensina algo sobre o amor.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 18,
    text: "Se eu fosse Moisés, pediria para Deus abrir o mar só para caminhar até você.",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 19,
    text: "Você é como a graça de Deus: imerecida, mas transformadora.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 20,
    text: "Se o amor move montanhas, o seu sorriso deve mover continentes.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
]

const categories = [
  { name: "Todas", count: allPickupLines.length },
  { name: "Romântica", count: allPickupLines.filter((line) => line.category === "Romântica").length },
  { name: "Bíblica", count: allPickupLines.filter((line) => line.category === "Bíblica").length },
  { name: "Engraçada", count: allPickupLines.filter((line) => line.category === "Engraçada").length },
  { name: "Inspiradora", count: allPickupLines.filter((line) => line.category === "Inspiradora").length },
]

export default function CantadasPage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [displayCount, setDisplayCount] = useState(9)

  const filteredLines = useMemo(() => {
    if (selectedCategory === "Todas") {
      return allPickupLines
    }
    return allPickupLines.filter((line) => line.category === selectedCategory)
  }, [selectedCategory])

  const displayedLines = filteredLines.slice(0, displayCount)
  const hasMoreLines = displayCount < filteredLines.length

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleFavorite = (line: any) => {
    if (isFavorite(line.text)) {
      const favoriteId = line.id.toString()
      removeFavorite(favoriteId)
    } else {
      addFavorite({
        type: "cantada",
        title: `Cantada ${line.category}`,
        content: line.text,
        category: line.category,
      })
    }
  }

  const loadMore = () => {
    setDisplayCount((prev) => prev + 9)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Cantadas Cristãs</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/cantadas" className="text-primary font-medium">
                Cantadas
              </Link>
              <Link href="/mensagens" className="text-muted-foreground hover:text-foreground transition-colors">
                Mensagens
              </Link>
              <Link href="/dicas" className="text-muted-foreground hover:text-foreground transition-colors">
                Dicas
              </Link>
              <Link href="/versos" className="text-muted-foreground hover:text-foreground transition-colors">
                Versículos
              </Link>
            </div>
            <Link href="/favoritos">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Favoritos</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Biblioteca de Cantadas Cristãs</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Cantadas respeitosas que honram os valores cristãos e demonstram interesse genuíno
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "secondary"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => {
                  setSelectedCategory(category.name)
                  setDisplayCount(9)
                }}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup Lines Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedLines.map((line) => {
              const IconComponent = line.icon
              const isLineFavorite = isFavorite(line.text)
              return (
                <Card key={line.id} className="bg-card border-border hover:shadow-md transition-all duration-200 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={line.color}>
                        <IconComponent className="h-3 w-3 mr-1" />
                        {line.category}
                      </Badge>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(line)}
                          className={isLineFavorite ? "text-primary" : ""}
                        >
                          <Heart className={`h-4 w-4 ${isLineFavorite ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(line.text)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-foreground text-lg leading-relaxed italic">"{line.text}"</blockquote>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {hasMoreLines && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8 bg-transparent" onClick={loadMore}>
                Carregar Mais Cantadas ({filteredLines.length - displayCount} restantes)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Gostou das cantadas?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Explore nossas mensagens prontas e dicas para relacionamentos cristãos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Ver Mensagens Prontas
            </Button>
            <Button variant="outline" size="lg">
              Dicas de Relacionamento
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
