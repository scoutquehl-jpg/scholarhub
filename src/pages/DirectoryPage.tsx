import { useMemo, useState } from "react"
import { Header } from "@/components/Header"
import { SearchInput } from "@/components/SearchInput"
import { CategoryFilter } from "@/components/CategoryFilter"
import { ClubCard } from "@/components/ClubCard"
import { clubs, categories } from "@/data/clubs"

export function DirectoryPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  const filteredClubs = useMemo(() => {
    const query = search.trim().toLowerCase()
    return clubs.filter((club) => {
      const matchesCategory = category === null || club.category === category
      const matchesQuery =
        query === "" ||
        club.name.toLowerCase().includes(query) ||
        club.description.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [search, category])

  return (
    <div className="min-h-svh bg-background">
      <Header>
        <SearchInput value={search} onChange={setSearch} />
      </Header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Club Directory
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Discover and join clubs across campus.
            </p>
          </div>
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </div>

        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium">No clubs found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
