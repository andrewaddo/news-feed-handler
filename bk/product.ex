defmodule Pulse.Product do

	defstruct [:name, :price, :seller, :image, :url, :source, :similarity]

	
	defp count(words) when is_list(words) do
    	Enum.reduce(words, %{}, &update_count/2)
  	end

  	defp update_count(word, acc) do
   		Map.update acc, word, 1, &(&1 + 1)
  	end

	def title_transform(title) do
		title
		|> String.downcase
		|> String.replace(~r/[\p{P}\p{S}]/, "")
		|> String.split
		|> Enum.map(&(String.trim(&1)))
		|> Enum.sort
		|> count
		
	end



	defp text_cosine(ref_vec, sample_vec) do
		# Based on python implementation of cosine similarity 
		# http://bit.ly/2f7z8jp
		
		
		ref_keys = Map.keys(ref_vec)
		|> MapSet.new

		sample_keys = Map.keys(sample_vec)
		|> MapSet.new

		common = MapSet.intersection(ref_keys, sample_keys)
		numerator = common
		|> Enum.reduce(0, fn(key, s) -> (Map.get(ref_vec, key) * Map.get(sample_vec, key)) + s end)

		ref_d = Map.values(ref_vec)
		|> Enum.reduce(0, fn(v, s) -> :math.pow(v, 2) + s end)

		sample_d = Map.values(sample_vec)
		|> Enum.reduce(0, fn(v, s) -> :math.pow(v, 2) + s end)


		denominator = :math.sqrt(ref_d) * :math.sqrt(sample_d)

		# Divide by zero check
		case denominator <= 0 do
			true -> 0.0
			_ -> numerator / denominator
			     |> Float.floor(5)
		end
	end

	def similarity(sample, ref) when is_list(sample) and length(sample) == 0 do
		[]
	end

	
	def similarity(sample, ref) when is_list(sample) and length(sample) > 0 do
		max = sample 
		|> Enum.max_by(&(&1.price))
		|> Map.get(:price)
			

		min = ref.price
	
		norm_ref = (ref.price - min)/(max - min)
		
		sample
		|> Enum.map(&(similarity(&1, ref)))
		|> Enum.map(fn(x) -> n_price = (x.price - min) / (max - min) 
							 # Trim value
							 b_price = case n_price do
								 v when v > 0.25 -> 0.25
								 v when v < -0.25 -> 0.25
								 v -> v
							 end 
							 
							sim = x.similarity - b_price
							%{x| similarity: sim}
							 
	                end) 
		
	end


	def similarity(sample, ref)  do
		ref_map = ref.name
		|> title_transform

		sample_map = sample.name
		|> title_transform

		text_cos = text_cosine(ref_map, sample_map)
		price_sim = 
		%{sample | similarity: text_cos}

	end


end